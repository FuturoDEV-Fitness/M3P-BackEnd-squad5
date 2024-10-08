"use strict";

const Encryption = require("../../utils/Encryption");

module.exports = {
  async up(queryInterface, Sequelize) {
    const senhaUsuarios = await Encryption.encrypt("12345678910");

    return queryInterface.bulkInsert("usuarios", [
      {
        nome: "João Silva",
        sexo: "Masculino",
        cpf: "12525679901",
        email: "joao.silva@email.com",
        senha: senhaUsuarios,
        dataNascimento: "1990-05-15",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: "Maria Souza",
        sexo: "Feminino",
        cpf: "98765432100",
        email: "maria.souza@email.com",
        senha: senhaUsuarios,
        dataNascimento: "1985-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: "Carlos Almeida",
        sexo: "Masculino",
        cpf: "32165498712",
        email: "carlos.almeida@email.com",
        senha: senhaUsuarios,
        dataNascimento: "1978-09-10",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: "Ana Paula",
        sexo: "Feminino",
        cpf: "45678912300",
        email: "ana.paula@email.com",
        senha: senhaUsuarios,
        dataNascimento: "1995-02-18",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: "Lucas Mendes",
        sexo: "Masculino",
        cpf: "65498732145",
        email: "lucas.mendes@email.com",
        senha: senhaUsuarios,
        dataNascimento: "1992-12-30",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("usuarios", null, {});
  },
};
