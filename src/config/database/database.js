const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_SCEM, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT 
});

module.exports = db