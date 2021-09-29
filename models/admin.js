const Sequelize = require('sequelize');
const sequelize = require('./database');

const admin = sequelize.define('second_admin', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false,
    }
});

module.exports = admin;















