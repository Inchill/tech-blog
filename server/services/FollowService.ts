const FollowModel = require('../models/FollowModel.ts');

module.exports = {
    // 插入一条数据
    insertOne: async (user_email, follow_email, status) => {
        return await FollowModel.create({
            user_email: user_email,
            follow_email: follow_email,
            status: status
        })
    },
    // 查询关注者列表
    findFollowers: async (user_email) => {
        return await FollowModel.findAll({
            where: {
                user_email: user_email
            }
        })
    },
    // 查询粉丝列表
    findFans: async (user_email) => {
        return await FollowModel.findAll({
            where: {
                follow_email: user_email
            }
        })
    },
    // 取消关注
    deleteFollower: async (user_email, follow_email) => {
        return await FollowModel.destroy({
            where: {
                user_email: user_email,
                follow_email: follow_email
            }
        })
    }
}