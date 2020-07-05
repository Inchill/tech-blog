<template>
    <div id="author-card" @click="seeUser">
        <div class="auth-img">
            <img :src="author.avatar" alt="404">
        </div>
        <div class="auth-info"><h3>{{ author.username }}</h3></div>
        <div class="auth-btn">
            <!-- <at-button type="primary">已关注</at-button> -->
        </div>
    </div>
</template>

<script lang="typescript">
import { Button } from 'at-ui';

export default {
    data() {
        return {
            
        }
    },
    props: {
        author: Object
    },
    components: {
        'at-button': Button
    },
    methods: {
        // 去查看当前博客作者信息
        seeUser() {
            this.$router.push({ 
                name: 'author', 
                query: { email: this.$Base64.encode(this.author.email) } 
            });
        }
    }
}
</script>

<style lang="stylus">
    #author-card
        height 80px;
        display flex;
        align-items center;
        justify-content center;
        cursor pointer;
        .auth-img
            flex 4;
            img
                width 60px;
                height 60px;
                border-radius 50%;
        .auth-info
            flex 5;
        .auth-btn
            flex 1;
</style>