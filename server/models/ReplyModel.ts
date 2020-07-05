const db7 = require('../config/db.ts');

const Reply = db7.sequelize.define('reply', {
    reply_id: {
        type: db7.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'reply_id'
    },
    comment_id: {
        type: db7.DataTypes.INTEGER,
        allowNull: false,
        field: 'comment_id'
    },
    content: {
        type: db7.DataTypes.STRING,
        allowNull: false,
        field: 'content'
    },
    from_email: {
        type: db7.DataTypes.STRING,
        allowNull: false,
        field: 'from_email'
    },
    to_email: {
        type: db7.DataTypes.STRING,
        allowNull: false,
        field: 'to_email'
    }
}, {
    tableName: 'reply_table'
});

module.exports = Reply;