const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog_db', 'root', 'root', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('blog_db is connected...');
}).catch(err => {
    console.error('connect failed:' + err);
});

const Op = Sequelize.Op;
const DataTypes = Sequelize.DataTypes;

module.exports = {
    sequelize,
    Op,
    DataTypes
}