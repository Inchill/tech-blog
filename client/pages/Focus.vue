<template>
    <div id="focus">
        <div v-for="blog in blogList" :key="blog.blog_id">
            <article-card :blog="blog"></article-card>
        </div>
    </div>
</template>

<script lang="typescript">
export default {
    data() {
        return {
            followerList: [],
            blogList: []
        }
    },
    components: {
        'article-card': () => import('../components/Card.vue')
    },
    created() {
        this.getFollowers();
    },
    methods: {
        // 获取关注者
        getFollowers() {
            this.axios.get('/users/follow/' + this.$store.getters.getUser.email).then(res => {
                this.followerList = res.data;
                this.getFollowersBlogs();
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
        // 获取关注者的所有博文
        getFollowersBlogs() {
            // 先返回所有异步请求结果
            let promiseAll = this.followerList.map((item) => {
                return this.axios.get('/blogs/email/' + item.follow_email);
            });
            // 再处理所有回调结果
            this.axios.all(promiseAll).then(resArr => {
                resArr.forEach(res => {
                    this.blogList = this.blogList.concat(res.data);
                });
            }, err => {
                console.error(err);
            });
        }
    }
}
</script>

<style lang="stylus">
    #focus
        padding 18px 24px;
</style>