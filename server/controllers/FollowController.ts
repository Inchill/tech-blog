const FollowService = require('../services/FollowService.ts');

module.exports = {
    // 关注某个用户
    followOne: async (ctx, next) => {
        await next();
        let user_email = ctx.request.body.user_email,
            follow_email = ctx.request.body.follow_email;
        // 查询被关注列表
        let fans = await FollowService.findFans(user_email);
        // 判断当前待关注者是否是自己粉丝，是则将status置为2，否则置为1
        // fan对象包含(user_email、follow_email、status、createdAt、updatedAt)
        let status = 1;
        for(var i = 0; i < fans.length; i++) {
            let fan = fans[i].dataValues;
            if(follow_email === fan.user_email) {  // 待关注者是自己粉丝
                status = 2;
                break;
            }
        }
        let data = await FollowService.insertOne(user_email, follow_email, status);
        ctx.response.body = data;
    },
    // 取消关注
    unfollowOne: async (ctx, next) => {
        await next();
        let user_email = ctx.request.body.user_email,
            follow_email = ctx.request.body.follow_email;
        let delData = await FollowService.deleteFollower(user_email, follow_email);
        ctx.response.body = delData;
    },
    // 查询关注者列表
    getFollowers: async (ctx, next) => {
        await next();
        let user_email = ctx.params.user_email;
        let followers = await FollowService.findFollowers(user_email);
        ctx.response.body = followers;
    },
    // 查询粉丝列表
    getFans: async (ctx, next) => {
        await next();
        let user_email = ctx.params.user_email;
        let fans = await FollowService.findFans(user_email);
        ctx.response.body = fans;
    },
    // 判断是否关注了某个用户
    isFollowOne: async (ctx, next) => {
        await next();
        let user_email = ctx.request.body.user_email,
            follow_email = ctx.request.body.follow_email;
        // 查询关注者列表
        let followers = await FollowService.findFollowers(user_email);
        let isFollow = false;
        for(var i = 0; i < followers.length; i++) {
            let follower = followers[i].dataValues;
            if(follow_email === follower.follow_email) {  // 待关注者在自己关注列表里
                isFollow = true;
                break;
            }
        }
        ctx.response.body = { isFollow: isFollow };
    }
}