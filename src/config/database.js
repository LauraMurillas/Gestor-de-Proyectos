// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres', // o 'mysql', 'sqlite', 'mssql'
});

module.exports = sequelize;
