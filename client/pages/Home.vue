<template>
    <div id="home">
        <div class="blog-list">
            <div class="list-item" v-for="blog in blogList" :key="blog.blog_id">
                <blog-card :blog="blog"></blog-card>
            </div>
        </div>
        <at-pagination :total="page.total"
            :current="page.currentPage"
            :page-size="page.pageSize"
            @page-change="pageChange"></at-pagination>
    </div>
</template>

<script lang="typescript">
import { Pagination } from 'at-ui';

export default {
    data() {
        return {
            blogList: [],
            page: {
                total: 0,
                pageSize: 6,
                currentPage: 1
            }
        }
    },
    created() {
        this.getBlogs();
    },
    components: {
        'blog-card': () => import('../components/Card.vue'),
        'at-pagitation': Pagination
    },
    methods: {
        getBlogs() {
            this.axios.get('/blogs/list', {
                params: {
                    pageSize: this.page.pageSize,
                    currentPage: this.page.currentPage
                }
            }).then(res => {
                this.page.total = res.data.total;
                this.blogList = res.data.blogList;
                this.pageChange(this.page.currentPage);
            }, err => {
                console.error(err);
            });
        },
        pageChange(currentPage) {
            this.page.currentPage = currentPage;
            this.axios.get('/blogs/list', {
                params: {
                    pageSize: this.page.pageSize,
                    currentPage: this.page.currentPage
                }
            }).then(res => {
                this.blogList = res.data.blogList;
            }, err => {
                console.error(err);
            });
        }
    }
}
</script>

<style lang="stylus">
    #home
        padding 18px 24px;
        .blog-list
            height 660px;
        .at-pagination
            margin 20px 0;
</style>