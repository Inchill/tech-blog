const db3 = require('../config/db.ts');

const Blog = db3.sequelize.define('blog', {
    blog_id: {
        type: db3.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'blog_id'
    },
    title: {
        type: db3.DataTypes.STRING,
        allowNull: false,
        field: 'title'
    },
    email: {
        type: db3.DataTypes.STRING,
        allowNull: false,
        field: 'email'
    },
    content: {
        type: db3.DataTypes.TEXT,
        allowNull: false,
        field: 'content'
    },
    sort_id: {
        type: db3.DataTypes.INTEGER,
        allowNull: false,
        field: 'sort_id'
    }
}, {
    tableName: 'blog_table'
});

module.exports = Blog;