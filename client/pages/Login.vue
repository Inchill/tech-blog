<template>
    <div id="login">
        <div class="login-panel">
            <div class="lgn-title">
                <h1>登录</h1>
                <p>新用户<a href="#/register">注册</a></p>
            </div>
            <div class="lgn-input">
                <at-input v-model="email" placeholder="邮箱" size="large"></at-input>
                <at-input v-model="password" type="password" placeholder="密码" size="large" 
                    :maxlength="12" :minlength="6" @keyup.enter.native="login"></at-input>
            </div>
            <h3><a href="">忘记密码?</a></h3>
            <div class="lgn-btn">
                <at-button type="primary" size="large" @click="login">登录</at-button>
            </div>
        </div>
    </div>
</template>

<script lang="typescript">
import { Input, Button } from 'at-ui';

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    components: {
        'at-input': Input,
        'at-button': Button
    },
    methods: {
        login() {
            if(this.email !== '' && this.password !== '') {
                let emailReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
                if(!emailReg.test(this.email)) {
                    this.$Message.error('邮箱格式不对!');
                    return false;
                }
                this.axios.post('/users/login', {
                    email: this.email,
                    password: this.password
                }).then(res => {
                    if(res.data.success) {
                        this.$Message.success(res.data.msg);
                        // 存储用户信息
                        this.$store.commit('setUser', { user: res.data.user });
                        this.$store.commit('setToken', { token: res.data.token });
                        this.$router.push({ name: 'home' });
                    } else {
                        this.$Message.warning(res.data.msg);
                    }
                }, err => {
                    console.error(err);
                })
            } else {
                this.$Message.error('输入信息不完整!');
            }
        }
    }
}
</script>

<style lang="stylus">
    #login
        background-color #f4f5f5;
        width 100%;
        height 96vh;
        display flex;
        align-items center;
        justify-content center;
        .login-panel
            background-color #fff;
            width 400px;
            height 400px;
            padding 40px 40px 0 40px;
            .lgn-title
                display flex;
                h1
                    flex 1;
                    justify-content flex-start;
                p
                    flex 1;
                    display flex;
                    align-items center;
                    justify-content flex-end;
            .lgn-input
                input
                    margin 30px 0;
            h3
                a
                    float right;
                    font-size: 13px;
                    color: #999;
                    text-decoration none;
                    opacity .6;
            .lgn-btn
                button
                    width 100%;
                    margin-top 20px;
</style>