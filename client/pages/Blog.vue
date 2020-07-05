<template>
    <div id="blog">
        <div class="blog-author">
            <div class="blog-img" @click="seeUser">
                <img :src="avatar" v-if="avatar">
                <img src="../../static/defaultAvatar.png" v-else>
            </div>
            <div class="blog-auth">
                <h3 @click="seeUser">{{ username }}</h3>
                <p>
                    <span>{{ blog.createdAt | dateFormat('YYYY年MM月DD日') }}</span>
                    <a @click.prevent="toEdit" 
                        style="display: inline-block; margin-left: 10px;"
                        v-if="isSelf">编辑</a>
                </p>
            </div>
        </div>
        <h1>{{ blog.title }}</h1>
        <p class="blog-content" v-html="blog.content"></p>
        <div class="comment-box">
            <h2>评论</h2>
            <div class="comment-area">
                <div class="user-img">
                    <img :src="selfAvatar" v-if="selfAvatar">
                    <img src="../../static/defaultAvatar.png" v-else>
                </div>
                <div class="user-comment">
                    <at-textarea v-model="inputComment" :maxlength="200" 
                        placeholder="说点什么(不超过200字)..."
                        resize="none" min-rows="1" max-rows="4"></at-textarea>
                </div>
                <div class="comment-btns">
                    <at-button type="primary" @click="doComment">评论</at-button>
                </div>
            </div>
        </div>
        <!-- 评论列表 -->
        <div class="comment-list">
            <h2>评论列表</h2>
            <comment-card v-for="comment in commentList" 
                :key="comment.comment_id"
                :comment="comment"></comment-card>
        </div>
    </div>
</template>

<script lang="typescript">
import { Textarea, Button } from 'at-ui';

export default {
    data() {
        return {
            blog_id: '',
            blog: {},
            avatar: '',     // 作者头像
            username: '',   // 作者昵称
            author: {},
            isSelf: false,  // 是否是自己文章
            inputComment: '',   // 评论
            commentList: []
        }
    },
    components: {
        'at-textarea': Textarea,
        'at-button': Button,
        'comment-card': () => import('../components/CommentCard.vue')
    },
    created() {
        this.blog_id = this.$Base64.decode(this.$route.query.blog_id);
        this.getBlog();
    },
    computed: {
        selfAvatar() {
            if(this.$store.getters.getUser !== null) {
                return this.$store.getters.getUser.avatar;
            } 
            return null;
        }
    },
    methods: {
        getBlog() {
            this.axios.get('/blogs/id/' + this.blog_id).then(res => {
                this.blog = res.data[0];
                this.getAuthor();
                this.getBlogComments();
            }, err => {
                console.error(err);
            })
        },
        getAuthor() {
            this.axios.get('/users/info/' + this.blog.email).then(res => {
                let user = res.data[0];
                this.avatar = user.avatar;
                this.username = user.username;
                this.author = user;
                if(this.$store.getters.getUser !== null) {
                    if(this.$store.getters.getUser.email === this.author.email) {
                        this.isSelf = true;
                    }
                }
            }, err => {
                console.error(err);
            })
        },
        // 去查看当前博客作者信息
        seeUser() {
            this.$router.push({ 
                name: 'author', 
                query: { email: this.$Base64.encode(this.author.email) } 
            });
        },
        toEdit() {
            this.$router.push({ 
                name: 'write', 
                query: { blog_id: this.$Base64.encode(this.blog_id) } 
            });
        },
        // 评论
        doComment() {
            if(this.$store.getters.getUser !== null) {
                if(this.inputComment.trim().length === 0) {
                    this.inputComment = '';
                    return;
                }
                let email = this.$store.getters.getUser.email,
                    blog_id = this.blog.blog_id,
                    comment = this.inputComment;
                this.axios.post('/blogs/comment', {
                    email,
                    blog_id,
                    comment
                }).then(res => {
                    this.inputComment = ''
                    this.$Message.success('评论成功!');
                    this.getBlogComments();
                }, err => {
                    console.error(err);
                })
            } else {
                if(confirm('您还未登录!请登录了再评论~'))
                    this.$router.push({ name: 'login' });
                else 
                    this.inputComment = '';
            }
        },
        // 获取评论
        getBlogComments() {
            this.axios.get('/blogs/comments/' + this.blog.blog_id).then(res => {
                this.commentList = res.data;
            }, err => {
                console.error(err);
            })
        }
    }
}
</script>

<style lang="stylus">
     #blog
        padding 18px 24px;
        .blog-author
            height 60px;
            display flex;
            align-items center;
            justify-content flex-start;
            .blog-img
                flex 1;
                cursor pointer;
                img
                    width 40px;
                    height 40px;
                    border-radius 50%;
            .blog-auth
                flex 18;
                h3
                    font-weight bold;
                    cursor pointer;
        .blog-content
            margin 20px 0;
        h1
            font-size 36px;
            margin 10px 0;
        .comment-box
            h2
                text-align center;
                margin 20px 0;
            .comment-area
                display flex;
                height 100px;
                justify-content center;
                align-items center;
                background-color #f1f1f1;
                margin 10px 0;
                .user-img
                    flex 1;
                    text-align center;
                    img
                        width 40px;
                        height 40px;
                        border-radius 50%;
                .user-comment
                    flex 8;
                    text-align center;
                    .at-textarea__original
                        max-width 1000px;
                        overflow-y hidden;
                .comment-btns
                    flex 1;
                    text-align center;
        .comment-list
            h2
                text-align center;
                margin 20px 0;
</style>