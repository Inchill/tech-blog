const UserModel = require('../models/UserModel.ts');

module.exports = {
    // 插入一条记录
    insertUser: async (username, password, email) => {
        return await UserModel.create({
            username: username,
            password: password,
            email: email
        })
    },
    // 查询用户
    findUser: async (email) => {
        return await UserModel.findAll({
            where: {
                email: email
            }
        })
    },
    // 修改头像
    updateAvatar: async (email, avatar) => {
        return await UserModel.update({
            avatar: avatar
        }, {
            where: {
                email: email
            }
        })
    },
    // 修改用户名
    updateUsername: async (email, username) => {
        return await UserModel.update({
            username: username
        }, {
            where: {
                email: email
            }
        })
    }
}