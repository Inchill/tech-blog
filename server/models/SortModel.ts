const db2 = require('../config/db.ts');

const Sort = db2.sequelize.define('sort', {
    sort_id: {
        type: db2.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'sort_id'
    },
    sort: {
        type: db2.DataTypes.STRING,
        allowNull: false,
        field: 'sort'
    }
}, {
    timestamps: false,
    tableName: 'sort_table'
});

module.exports = Sort;