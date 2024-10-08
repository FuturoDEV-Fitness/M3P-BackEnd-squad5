"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "praticas",
      [
        {
          nome: ["caminhada", "corrida", "musculação", "esportes coletivos"],
          id_local: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: ["esportes coletivos", "musculação"],
          id_local: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: ["natação", "esportes coletivos"],
          id_local: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: ["musculação", "caminhada", "corrida"],
          id_local: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: ["surf", "natação", "esportes coletivos"],
          id_local: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("praticas", null, {});
  },
};
