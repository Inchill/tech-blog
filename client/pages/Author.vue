<template>
    <div id="author">
        <div class="info-box">
            <div class="auth-img">
                <img :src="avatar" v-if="avatar">
                <img src="../../static/defaultAvatar.png" v-else>
            </div>
            <div class="auth-info">
                <h1>{{ author.username }}</h1>
                 <div class="follow" v-if="!isSelf">
                    <at-button type="primary" v-if="isFollow" @click="cancelFollow">已关注</at-button>
                    <at-button v-else @click="toFollow">关注</at-button>
                </div>
            </div>
            <div class="join-time">
                加入时间:{{ author.createdAt | dateFormat('YYYY-MM-DD') }}
            </div>
        </div>
        <div v-for="blog in blogList" :key="blog.blog_id" class="blog-list">
            <article-card :blog="blog" class="blog-item"></article-card>
        </div>
    </div>
</template>

<script lang="typescript">
import { Button } from 'at-ui';

export default {
    data() {
        return {
            email: '',
            author: {},
            avatar: '',
            blogList: [],
            isFollow: false,   // 是否关注
            isSelf: false   // 该作者是否就是自己
        }
    },
    components: {
        'at-button': Button,
        'article-card': () => import('../components/Card.vue')
    },
    created() {
        this.email = this.$Base64.decode(this.$route.query.email);
        if(this.$store.getters.getUser !== null) {
            if(this.email === this.$store.getters.getUser.email) this.isSelf = true;
        }
        this.getAuthor();
    },
    methods: {
        getAuthor() {
            this.axios.get('/users/info/' + this.email).then(res => {
                this.author = res.data[0];
                this.avatar = this.author.avatar;
                this.getAuthorBlogs();
                this.isFollowTheAuthor();
            }, err => {
                if(err.code === -1) {  // token鉴权失败
                    this.$Modal.info({
                        content: '登录过期,请重新登录!'
                    });
                    this.$store.commit('logout');
                    this.$router.push({ name: 'login' });
                }
            })
        },
        // 获取该博主博文
        getAuthorBlogs() {
            this.axios.get('/blogs/email/' + this.email).then(res => {
                this.blogList = res.data;
            }, err => {
                console.error(err);
            })
        },
        // 判断是否关注该用户
        isFollowTheAuthor() {
            this.axios.post('/users/isFollow', {
                user_email: this.$store.getters.getUser.email,
                follow_email: this.email
            }).then(res => {
                this.isFollow = res.data.isFollow;
            }, err => {
                if(err.code === -1) {  // token鉴权失败
                    this.$Modal.info({
                        content: '登录过期,请重新登录!'
                    });
                    this.$store.commit('logout');
                    this.$router.push({ name: 'login' });
                }
            })
        },
        // 关注
        toFollow() {
            this.axios.post('/users/follow', {
                user_email: this.$store.getters.getUser.email,
                follow_email: this.email
            }).then(res => {
                this.isFollowTheAuthor();
            }, err => {
                console.error(err);
            })
        },
        // 取消关注
        cancelFollow() {
            this.axios.post('/users/unfollow', {
                user_email: this.$store.getters.getUser.email,
                follow_email: this.email
            }).then(res => {
                this.isFollowTheAuthor();
            }, err => {
                console.error(err);
            })
        }
    }
}
</script>

<style lang="stylus">
    #author
        padding 18px 24px;
        .info-box
            height 100px;
            display flex;
            align-items center;
            justify-content center;
            .auth-img
                flex 1;
                img
                    width 80px;
                    height 80px;
                    border-radius 50%;
            .auth-info
                flex 8;
                .follow
                    margin-top 10px;
            .join-time
                flex 2;
</style>