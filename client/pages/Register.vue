<template>
    <div id="register">
        <div class="register-panel">
            <div class="reg-title">
                <h1>注册</h1>
                <p>已有账号?<a href="#/login">登录</a></p>
            </div>
            <div class="reg-input">
                <at-input v-model="username" placeholder="用户名" size="large"></at-input>
                <at-input v-model="email" placeholder="邮箱" size="large"></at-input>
                <at-input v-model="password" type="password" placeholder="密码:6~12位" size="large" 
                    :maxlength="12" :minlength="6"></at-input>
                <at-input v-model="checkPass" type="password" placeholder="请确认密码" size="large" 
                    :maxlength="12" :minlength="6" @keyup.enter.native="register"></at-input>
            </div>
            <div class="reg-btn">
                <at-button type="primary" size="large" @click="register">注册</at-button>
            </div>
        </div>
    </div>
</template>

<script lang="typescript">
import { Input, Button } from 'at-ui';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            checkPass: ''
        }
    },
    components: {
        'at-input': Input,
        'at-button': Button
    },
    methods: {
        register() {
            if(this.username !== '' && this.email !== '' && this.password !== '' && this.checkPass !== '') {
                let emailReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
                if(!emailReg.test(this.email)) {
                    this.$Message.error('邮箱格式不对!');
                    return false;
                }
                if(this.password !== this.checkPass) {
                    this.$Message.error('两次密码不一致!');
                    return false;
                }
                if(this.password.length < 6 || this.password.length > 12) {
                    this.$Message.error('密码长度超出指定范围!');
                    return false;
                }
                this.axios.post('/users/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }).then(res => {
                    if(res.data.success) {
                        this.$router.push({ name: 'login' });
                        this.$Message.success('注册成功!');
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
    #register
        background-color #f4f5f5;
        width 100%;
        height 96vh;
        display flex;
        align-items center;
        justify-content center;
        .register-panel
            background-color #fff;
            width 400px;
            height 400px;
            padding 40px 40px 0 40px;
            .reg-title
                display flex;
                h1
                    flex 1;
                    justify-content flex-start;
                p
                    flex 1;
                    display flex;
                    align-items center;
                    justify-content flex-end;
            .reg-input
                input
                    margin 20px 0;
            .reg-btn
                button
                    width 100%;
</style>