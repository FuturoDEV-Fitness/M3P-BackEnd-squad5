"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("locais", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nomeLocal: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      localidade: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      cep:{
        type: Sequelize.STRING(8),
        allowNull: false
      },
      latitude: {
        type: Sequelize.STRING, // "-27.5801"
        //allowNull: true
      },
      longitude: {
        type: Sequelize.STRING, //"-48.49239"
        //allowNull: true
      },
      praticasPermitidas:{
        type: Sequelize.STRING(200),
        allowNull: false
      },
      idUsuario:{
        type: Sequelize.INTEGER, //allowNull: false,
        
        references:{
          model: 'usuarios',
          key: 'id'
        },

      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("locais");
  },
};
