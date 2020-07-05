const CommentService = require('../services/CommentService.ts');

module.exports = {
    // 添加评论
    addComment: async (ctx, next) => {
        await next();
        let email = ctx.request.body.email,
            blog_id = ctx.request.body.blog_id,
            comment = ctx.request.body.comment;
        let data = await CommentService.insertComment(email, blog_id, comment);
        ctx.response.body = data;
    },
    // 根据博客id获取评论
    getComments: async (ctx, next) => {
        await next();
        let blog_id = ctx.params.blog_id;
        let comments = await CommentService.findBlogComments(blog_id);
        ctx.response.body = comments;
    }
}