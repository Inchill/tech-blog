const db5 = require('../config/db.ts');

const Follow = db5.sequelize.define('follow', {
    user_email: {
        type: db5.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'user_email'
    },
    follow_email: {
        type: db5.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'follow_email'
    },
    status: {
        type: db5.DataTypes.INTEGER,
        allowNull: false,
        field: 'status'
    }
}, {
    tableName: 'follow_table'
});

module.exports = Follow;