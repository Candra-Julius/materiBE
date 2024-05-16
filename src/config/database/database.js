const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres', 'developer', 'developer', {
    host: '10.191.78.125',
    port: 5432,
    dialect: 'postgres'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

module.exports = db