"use strict";

const Encryption = require("../../utils/Encryption");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Criptografa a mesma senha para todos os usuários
    const senhaUsuarios = await Encryption.encrypt("12345678910");

    return queryInterface.bulkInsert("usuarios", [
      {
        nome: "João Silva",
        sexo: "masculino",
        cpf: "12525679901",
        email: "joao.silva@email.com",
        senha: senhaUsuarios, // Mesma senha para todos
        dataNascimento: "1990-05-15",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: "Maria Souza",
        sexo: "feminino",
        cpf: "98765432100",
        email: "maria.souza@email.com",
        senha: senhaUsuarios, // Mesma senha para todos
        dataNascimento: "1985-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: "Carlos Almeida",
        sexo: "masculino",
        cpf: "32165498712",
        email: "carlos.almeida@email.com",
        senha: senhaUsuarios, // Mesma senha para todos
        dataNascimento: "1978-09-10",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: "Ana Paula",
        sexo: "feminino",
        cpf: "45678912300",
        email: "ana.paula@email.com",
        senha: senhaUsuarios, // Mesma senha para todos
        dataNascimento: "1995-02-18",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: "Lucas Mendes",
        sexo: "masculino",
        cpf: "65498732145",
        email: "lucas.mendes@email.com",
        senha: senhaUsuarios, // Mesma senha para todos
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
