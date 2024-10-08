"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("enderecos", [
      {
        logradouro: "Rua das Flores",
        numero: 123,
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01001000",
        complemento: "Apto 101",
        usuarioId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        logradouro: "Avenida Brasil",
        numero: 456,
        bairro: "Jardim América",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20040000",
        complemento: "Casa",
        usuarioId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        logradouro: "Rua das Palmeiras",
        numero: 789,
        bairro: "Copacabana",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "22041010",
        complemento: "Cobertura 302",
        usuarioId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        logradouro: "Avenida Paulista",
        numero: 1000,
        bairro: "Bela Vista",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01310000",
        complemento: "Sala 202",
        usuarioId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        logradouro: "Rua da Consolação",
        numero: 876,
        bairro: "Consolação",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01302000",
        complemento: "Casa",
        usuarioId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("enderecos", null, {});
  },
};
