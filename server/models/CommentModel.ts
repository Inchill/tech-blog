const db6 = require('../config/db.ts');

const Comments = db6.sequelize.define('comment', {
    comment_id: {
        type: db6.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'comment_id'
    },
    email: {
        type: db6.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'email'
    },
    blog_id: {
        type: db6.DataTypes.INTEGER,
        allowNull: false,
        field: 'blog_id'
    },
    comment: {
        type: db6.DataTypes.TEXT,
        allowNull: false,
        field: 'comment'
    }
}, {
    tableName: 'comment_table'
});

module.exports = Comments;