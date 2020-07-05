<template>
    <div id="card">
        <div class="cd-author">
            <span>{{ blog.user.username }}</span>
            <span>{{ blog.createdAt | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
        </div>
        <div class="cd-title" @click="toDetail">{{ blog.title }}</div>
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
        blog: Object
    },
    methods: {
        toDetail() {
            this.$router.push({ 
                name: 'blog', 
                query: { blog_id: this.$Base64.encode(this.blog.blog_id) } 
            });
        }
    }
}
</script>

<style lang="stylus">
    #card
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
</style>