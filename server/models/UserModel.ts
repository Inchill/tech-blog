const db = require('../config/db.ts');

const User = db.sequelize.define('user', {
    email: {
        type: db.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'email'
    },
    username: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'username'
    },
    password: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'password'
    },
    avatar: {
        type: db.DataTypes.STRING,
        allowNull: true,
        field: 'avatar'
    }
}, {
    tableName: 'user_table'
});

module.exports = User;