<template>
    <div id="search">
        <div v-for="blog in blogList" :key="blog.blog_id">
            <search-card :blog="blog" :keyword="keyword"></search-card>
        </div>
    </div>
</template>

<script lang="typescript">
export default {
    data() {
        return {
            blogList: [],
            keyword: ''
        }
    },
    components: {
        'search-card': () => import('../components/SearchCard.vue')
    },
    created() {
        this.keyword = this.$Base64.decode(this.$route.query.keyword);
        this.searchBlogs(this.keyword);
    },
    watch: {
        // 组件复用
        $route(to, from) {
            this.keyword = this.$Base64.decode(this.$route.query.keyword);
            this.searchBlogs(this.keyword);
        }
    },
    methods: {
        searchBlogs(searchValue) {
            this.axios.get('/blogs/search/' + searchValue).then(res => {
                this.blogList = res.data;
            }, err => {
                console.error(err);
            });
        }
    }
}
</script>

<style lang="stylus">
    #search
        padding 18px 24px;
        .highlights-text
            color red;
</style>