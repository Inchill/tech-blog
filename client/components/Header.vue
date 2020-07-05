<template>
    <div id="header">
        <ul class="link-wrapper">
            <router-link :to="{ name: 'home' }"><i class="icon icon-home"></i>首页</router-link>
            <router-link :to="{ name: 'focus' }"><i class="icon icon-layers"></i>关注</router-link>
            <router-link :to="{ name: 'frontend' }"><i class="icon icon-chrome"></i>前端</router-link>
            <router-link :to="{ name: 'backend' }"><i class="icon icon-codepen"></i>后端</router-link>
            <router-link :to="{ name: 'freebie' }"><i class="icon icon-gitlab"></i>开发工具</router-link>
            <router-link :to="{ name: 'career' }"><i class="icon icon-github"></i>代码人生</router-link>
        </ul>
        <div class="search">
            <at-input v-model="searchValue" placeholder="搜索" size="small" @keyup.enter.native="toSearch"></at-input>
            <at-button type="primary" icon="icon-search" size="small" @click="toSearch"></at-button>
        </div>
        <div class="write">
            <at-button type="primary" @click="toWrite">写文章</at-button>
        </div>
        <div class="user-center">
            <div v-if="user !== null">
                <img :src="avatar" @click="toUserCenter" v-if="avatar">
                <img src="../../static/defaultAvatar.png" alt="404" @click="toUserCenter" v-else>
                <a @click="logout">退出</a>
            </div>
            <div v-else>
                <router-link :to="{ name: 'login' }">登录</router-link>
                <router-link :to="{ name: 'register' }">注册</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="typescript">
import { Input, Button } from 'at-ui';

export default {
    data() {
        return {
            searchValue: ''
        }
    },
    computed: {
        avatar: function() {
            if(this.$store.getters.getUser !== null) {
                return this.$store.getters.getUser.avatar;
            } 
            return null;
        },
        user: function() {
            if(this.$store.getters.getUser !== null) {
                return this.$store.getters.getUser;
            } 
            return null;
        }
    },
    components: {
        'at-input': Input,
        'at-button': Button
    },
    methods: {
        logout() {
            if(confirm('确定退出吗？')) this.$store.commit('logout');
            this.$router.push({ name: 'home' });
        },
        toWrite() {
            this.$router.push({ name: 'write' });
        },
        toUserCenter() {
            this.$router.push({ name: 'userCenter' });
        },
        toSearch() {
            if(this.searchValue.length) {
                this.$router.push({ 
                    name: 'search', 
                    query: { keyword: this.$Base64.encode(this.searchValue) } 
                });
                this.searchValue = '';
            }
        }
    }
}
</script>

<style lang="stylus">
    #header
        height 45px;
        background-color #fff;
        display flex;
        .link-wrapper
            flex 20;
            >a
                list-style-type none;
                display inline-block;
                text-decoration none;
                height 45px;
                line-height 45px;
                padding 0 15px;
                color #71777c;
            .click-active
                color blue !important;
        .search
            flex 6;
            display flex;
            align-items center;  //上下居中
            justify-content center;
            max-width 200px;
            border: 1px solid hsla(0,0%,59.2%,.2);
            height 30px;
            margin-top 7px;
            border-radius 5%;
            input
                border none;
            button
                background-color #fff;
                border none;
            .icon-search
                color blue;
        .write
            flex 2;
            display flex;
            align-items center;  //上下居中
            justify-content center;
        .user-center
            flex 3;
            display flex;
            align-items center;  //上下居中
            justify-content flex-end;
            margin-right 10px;
            div
                display flex;
                align-items center;  //上下居中
                justify-content flex-end;
                position relative;
                a
                    margin 0 10px;
                img
                    width 30px;
                    height 30px;
                    border-radius 50%;
                    cursor pointer;
</style>