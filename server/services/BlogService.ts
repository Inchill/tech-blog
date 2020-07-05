const BlogModel = require('../models/BlogModel.ts');
const db4 = require('../config/db.ts');
const UserModel3 = require('../models/UserModel.ts');
BlogModel.belongsTo(UserModel3, { foreignKey: 'email', targetKey: 'email' });

module.exports = {
    // 插入博文记录
    insertBlog: async (title, email, content, sort_id) => {
        return await BlogModel.create({
            title: title,
            email: email,
            content: content,
            sort_id: sort_id
        })
    },
    // 更新博客
    updateBlog: async (title, blog_id, content, sort_id) => {
        return await BlogModel.update({
            title: title,
            content: content,
            sort_id: sort_id
        }, {
            where: {
                blog_id: blog_id
            }
        })
    },
    // 查找所有博文
    findBlogs: async () => {
        return await BlogModel.findAll({
            include: [{
                model: UserModel3,
                attributes: ['email', 'username', 'avatar']
            }]
        });
    },
    // 分页获取博文(按时间降序排列)
    findBlogsByPage: async (pageSize, currentPage) => {
        let offset = (currentPage - 1) * pageSize;
        return await BlogModel.findAll({
            offset,
            limit: pageSize,
            order: [['createdAt', 'DESC']],
            include: [{
                model: UserModel3,
                attributes: ['email', 'username', 'avatar']
            }]
        });
    },
    // 根据id查询博客
    findBlogById: async (blog_id) => {
        return await BlogModel.findAll({
            where: {
                blog_id: blog_id
            },
            order: [['createdAt', 'DESC']],
            include: [{
                model: UserModel3,
                attributes: ['email', 'username', 'avatar']
            }]
        })
    },
    // 根据关键字查询
    findBlogByKeyword: async (keyword) => {
        return await BlogModel.findAll({
            where: {
                [db4.Op.or]: [
                    {
                        title: {
                            [db4.Op.like]: '%' + keyword + '%'
                        }
                    },
                    {
                        content: {
                            [db4.Op.like]: '%' + keyword + '%'
                        }
                    }
                ]
            },
            order: [['createdAt', 'DESC']],
            include: [{
                model: UserModel3,
                attributes: ['email', 'username', 'avatar']
            }]
        })
    },
    // 根据类型id查询博客
    findBlogBySortId: async (sort_id) => {
        return await BlogModel.findAll({
            where: {
                sort_id: sort_id
            },
            order: [['createdAt', 'DESC']],
            include: [{
                model: UserModel3,
                attributes: ['email', 'username', 'avatar']
            }]
        })
    },
    // 根据email查询
    findBlogsByEmail: async (email) => {
        return await BlogModel.findAll({
            where: {
                email: email
            },
            order: [['createdAt', 'DESC']],
            include: [{
                model: UserModel3,
                attributes: ['email', 'username', 'avatar']
            }]
        })
    } 
}