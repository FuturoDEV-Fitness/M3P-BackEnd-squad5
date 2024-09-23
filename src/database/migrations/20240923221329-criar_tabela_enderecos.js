'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('enderecos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      logradouro: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bairro: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING(9),
        allowNull: false,
      },
      complemento: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      usuarioId: {
        type: Sequelize.INTEGER, //allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  
  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('enderecos');
     
  }
};
