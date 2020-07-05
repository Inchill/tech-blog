const CommentModel = require('../models/CommentModel.ts');
const UserModel2 = require('../models/UserModel.ts');
// 用户与评论是一对多关系
// UserModel2.hasMany(CommentModel);  // 不要加这句，哪个模型需要关联就写一句声明
// 建立关联关系时，如果外键关联的是主键则不用写 targetKey，否则需要。
CommentModel.belongsTo(UserModel2, { foreignKey: 'email', targetKey: 'email' }); 

module.exports = {
    // 添加评论
    insertComment: async (email, blog_id, comment) => {
        return await CommentModel.create({
            email,
            blog_id,
            comment
        });
    },
    // 获取博客评论(要返回用户头像和用户名，需关联表，建立一对多关系)
    findBlogComments: async (blog_id) => {
        return await CommentModel.findAll({
            where: {
                blog_id
            },
            include: [{
                model: UserModel2,
                attributes: ['username', 'avatar']
            }]
        })
    }
}