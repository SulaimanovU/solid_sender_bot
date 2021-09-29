const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL);

module.exports = sequelize;




