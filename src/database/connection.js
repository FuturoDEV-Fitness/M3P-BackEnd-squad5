const { Sequelize } = require('sequelize')
const databaseConfig = require('../config/database.config')

const connection = new Sequelize(databaseConfig)
                    //new Pool() qdo apenas PG

module.exports = connection
