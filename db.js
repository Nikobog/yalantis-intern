const { Sequelize } = require('sequelize');

const  sequelize = new Sequelize('test-db', 'user', 'pass', {
    dialect: 'sqlite',
    host: './dev.sqlite',
    port: '5000'
})

module.exports = sequelize;