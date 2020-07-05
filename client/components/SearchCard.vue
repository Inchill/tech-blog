<template>
    <div id="search-card">
        <div class="cd-author">
            <span>{{ username }}</span>
            <span>{{ blog.createdAt | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
        </div>
        <div class="cd-title" @click="toDetail" v-html="highlights">{{ blog.title }}</div>
        <p class="cd-desc">{{ blog.content | textFilter }}</p>
    </div>
</template>

<script lang="typescript">
export default {
    data() {
        return {
            username: ''
        }
    },
    props: {
        blog: Object,
        keyword: String
    },
    methods: {
        toDetail() {
            this.$router.push({ 
                name: 'blog', 
                query: { blog_id: this.$Base64.encode(this.blog.blog_id) } 
            });
        },
        getAuthor() {
            this.axios.get('/users/info/' + this.blog.email).then(res => {
                let user = res.data[0];
                this.username = user.username;
            }, err => {
                console.error(err);
            })
        }
    },
    created() {
        this.getAuthor();
    },
    computed: {
        highlights() {
            let titleString = this.blog.title;
            // 匹配关键字正则
            let replaceReg = new RegExp(this.keyword, 'g');
            // 高亮替换v-html值
            let replaceString = '<span style="color: red;">' + this.keyword + '</span>';
            // 开始替换
            return titleString.replace(replaceReg, replaceString);
        }
    }
}
</script>

<style lang="stylus">
    #search-card
        height 110px;
        width 100%;
        border-bottom 2px solid #f4f5f5;
        border-top 2px solid #f4f5f5;
        .cd-author
            color #b2bac2;
            margin-top 5px;
            span
                display inline-block;
            span:last-child
                margin-left 20px;
        .cd-title
            font-size: 24px;
            font-weight: 600;
            line-height: 1.2;
            color: #2e3135;
            margin 10px 0;
            cursor pointer;
        .cd-desc
            color #909090;
            font-size: 18px;
            white-space nowrap;
            overflow hidden;
            text-overflow ellipsis;
            max-width 100%;
</style>