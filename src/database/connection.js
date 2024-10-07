const { Sequelize } = require('sequelize')
const databaseConfig = require('../config/database.config')

const connection = databaseConfig.url
? new Sequelize(databaseConfig.url, {
    dialect: databaseConfig.dialect,
    dialectOptions: databaseConfig.dialectOptions,
  })
:
new Sequelize(databaseConfig)
                    

module.exports = connection
