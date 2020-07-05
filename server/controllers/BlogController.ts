const BlogService = require('../services/BlogService.ts');

module.exports = {
    // 新增博文
    addBlog: async (ctx, next) => {
        await next();
        let title = ctx.request.body.title,
            email = ctx.request.body.email,
            content = ctx.request.body.content,
            sort_id = ctx.request.body.sort_id;
        let retData = await BlogService.insertBlog(title, email, content, sort_id);
        ctx.response.body = retData;
    },
    // 更新博文
    updateBlog: async (ctx, next) => {
        await next();
        let title = ctx.request.body.title,
            blog_id = ctx.request.body.blog_id,
            content = ctx.request.body.content,
            sort_id = ctx.request.body.sort_id;
        let retData = await BlogService.updateBlog(title, blog_id, content, sort_id);
        ctx.response.body = retData;
    },
    // 分页获取博客
    getBlogs: async (ctx, next) => {
        await next();
        let pageSize = Number(ctx.request.query.pageSize),
            currentPage = Number(ctx.request.query.currentPage);
        let allBlogs = await BlogService.findBlogs();
        let total = allBlogs.length;
        let pageBlogs = await BlogService.findBlogsByPage(pageSize, currentPage);
        ctx.response.body = {
            total,
            blogList: pageBlogs
        };
    },
    // 根据id查询博客
    getBlogById: async (ctx, next) => {
        await next();
        let blog_id = ctx.params.blog_id;
        let blog = await BlogService.findBlogById(blog_id);
        ctx.response.body = blog;
    },
    // 关键字搜索博客
    searchBlog: async (ctx, next) => {
        await next();
        let keyword = ctx.params.keyword;
        let retData = await BlogService.findBlogByKeyword(keyword);
        ctx.response.body = retData;
    },
    // 根据类型查询
    getBlogBySortId: async (ctx, next) => {
        await next();
        let sort_id = ctx.params.sort_id;
        let retData = await BlogService.findBlogBySortId(sort_id);
        ctx.response.body = retData;
    },
    // 根据email查询博客
    getBlogsByEmail: async (ctx, next) => {
        await next();
        let email = ctx.params.email;
        let blogs = await BlogService.findBlogsByEmail(email);
        ctx.response.body = blogs;
    }
}