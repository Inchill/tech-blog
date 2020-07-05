const UserService = require('../services/UserService.ts');
const tools = require('../config/tools.ts');
const jsonwebtoken = require('jsonwebtoken');  // 用于签发token

module.exports = {
    // 用户注册业务逻辑
    doRegister: async (ctx, next) => {
        await next();
        let username = ctx.request.body.username,
            email = ctx.request.body.email,
            password = ctx.request.body.password;
        // 1 判断用户是否存在(不存在返回空数组)
        let retArr = await UserService.findUser(email);
        if(retArr.length) {
            ctx.response.body = { success: false, msg: '账号已存在!' };
        } else {
            let retData = await UserService.insertUser(username, tools.enbcrypt(password), email);
            ctx.response.body = { success: true, msg: retData };
        }
    },
    // 用户登录业务逻辑
    doLogin: async (ctx, next) => {
        await next();
        let password = ctx.request.body.password,
            email = ctx.request.body.email;
        // 判断账号是否注册
        let retArr = await UserService.findUser(email);
        if(retArr.length) {
            let user = retArr[0].dataValues;
            // 再判断密码是否一致
            if(tools.debcrypt(password, user.password)) {
                let token = jsonwebtoken.sign({
                    email: email,
                    password: password
                }, 'secret', {
                    expiresIn: '1h'
                });
                user.password = password;  
                ctx.response.body = { 
                    success: true, 
                    msg: '登录成功!',
                    token: token,
                    user: user 
                };
            } else {
                ctx.response.body = { success: false, msg: '密码错误!' };
            }
        } else {
            ctx.response.body = { success: false, msg: '账号不存在!' };
        }
    },
    // 修改用户信息
    modifyUser: async (ctx, next) => {
        await next();
        if(ctx.request.body.avatar) {
            let email = ctx.request.body.email,
                avatar = ctx.request.body.avatar;
            let retData = await UserService.updateAvatar(email, avatar);
            ctx.response.body = retData;
        }
        if(ctx.request.body.username) {
            let email = ctx.request.body.email,
                username = ctx.request.body.username;
            let retData = await UserService.updateUsername(email, username);
            ctx.response.body = retData;
        }
    },
    // 获取用户信息
    getUser: async (ctx, next) => {
        await next();
        let email = ctx.params.email;
        let userInfo = await UserService.findUser(email);
        ctx.response.body = userInfo;
    }
}