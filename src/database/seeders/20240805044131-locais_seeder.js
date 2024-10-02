"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("locais", [
      {
        nomeLocal: "Academia São Paulo",
        descricaoLocal: "Academia equipada com diversos aparelhos",
        cep: "01001000",
        endereco: "Rua das Flores, 123",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
        latitude: "-23.55052",
        longitude: "-46.63331",
        id_usuario: 1, // Deve corresponder a um usuário válido no seeder de usuários
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nomeLocal: "Centro Esportivo Rio",
        descricaoLocal: "Centro com quadras de futebol e basquete",
        cep: "20040000",
        endereco: "Avenida Brasil, 456",
        bairro: "Jardim América",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        latitude: "-22.90685",
        longitude: "-43.17290",
        id_usuario: 2, // Deve corresponder a um usuário válido no seeder de usuários
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nomeLocal: "Parque Copacabana",
        descricaoLocal:
          "Parque com espaço para caminhadas e atividades ao ar livre",
        cep: "22041010",
        endereco: "Rua das Palmeiras, 789",
        bairro: "Copacabana",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        latitude: "-22.97111",
        longitude: "-43.18223",
        id_usuario: 3, // Deve corresponder a um usuário válido no seeder de usuários
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nomeLocal: "Clínica Esportiva Paulista",
        descricaoLocal: "Clínica especializada em fisioterapia esportiva",
        cep: "01310000",
        endereco: "Avenida Paulista, 1000",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        estado: "SP",
        latitude: "-23.56168",
        longitude: "-46.65587",
        id_usuario: 4, // Deve corresponder a um usuário válido no seeder de usuários
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nomeLocal: "Centro de Treinamento Consolação",
        descricaoLocal: "Centro de treinamento funcional",
        cep: "01302000",
        endereco: "Rua da Consolação, 876",
        bairro: "Consolação",
        cidade: "São Paulo",
        estado: "SP",
        latitude: "-23.54777",
        longitude: "-46.64151",
        id_usuario: 5, // Deve corresponder a um usuário válido no seeder de usuários
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("locais", null, {});
  },
};
