const Sequelize = require('sequelize');
const sequelize = require('./database');

const user = sequelize.define('second_user', {
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

module.exports = user;















