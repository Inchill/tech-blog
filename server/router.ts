const koaRouter = require('koa-router')();
const UserController = require('./controllers/UserController.ts');
const SortController = require('./controllers/SortController.ts');
const BlogController = require('./controllers/BlogController.ts');
const FollowController = require('./controllers/FollowController.ts');
const CommentController = require('./controllers/CommentController.ts');
const fs = require('fs');

module.exports = (app) => {
    // koaRouter.prefix('/api');
    // 1.用户资源restful API
    // 用户注册
    koaRouter.post('/users/register', UserController.doRegister);
    // 用户登录
    koaRouter.post('/users/login', UserController.doLogin);
    // 修改用户信息
    koaRouter.put('/users/update', UserController.modifyUser);
    // 获取用户信息(根据email)
    koaRouter.get('/users/info/:email', UserController.getUser);
    // 关注
    koaRouter.post('/users/follow', FollowController.followOne);
    // 取消关注
    koaRouter.post('/users/unfollow', FollowController.unfollowOne);
    // 获取关注者列表
    koaRouter.get('/users/follow/:user_email', FollowController.getFollowers);
    // 获取粉丝列表
    koaRouter.get('/users/unfollow/:user_email', FollowController.getFans);
    // 判断是否关注某个用户
    koaRouter.post('/users/isFollow', FollowController.isFollowOne);


    // 2.博客资源RestFul API
    // 获取所有博客类型
    koaRouter.get('/blogs/sort', SortController.getAllSorts);
    // 新增博客
    koaRouter.post('/blogs/new', BlogController.addBlog);
    // 更新博客
    koaRouter.put('/blogs/update', BlogController.updateBlog);
    // 获取所有博客
    koaRouter.get('/blogs/list', BlogController.getBlogs);
    // 根据blog_id查询博客
    koaRouter.get('/blogs/id/:blog_id', BlogController.getBlogById);
    // 根据email查询博客
    koaRouter.get('/blogs/email/:email', BlogController.getBlogsByEmail);
    // 搜索博客
    koaRouter.get('/blogs/search/:keyword', BlogController.searchBlog);
    // 根据博客类型搜索博客
    koaRouter.get('/blogs/sort/:sort_id', BlogController.getBlogBySortId);
    // 2.1博客评论
    // 添加评论
    koaRouter.post('/blogs/comment', CommentController.addComment);
    // 获取评论
    koaRouter.get('/blogs/comments/:blog_id', CommentController.getComments);


    app.use(koaRouter.routes()).use(koaRouter.allowedMethods());
};