'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dados = [
      {
        logradouro: "Rua dos Ignorantes",
        numero: 119,
        bairro: "Itacorubi",
        cidade: "Florianópolis",
        estado: "SC",
        cep: "88034-354",
        complemento: "Casa verde no alto da colina",
        usuarioId: 1,
      },
      {
        logradouro: "Avenida das Flores",
        numero: 1000,
        bairro: "Centro",
        cidade: "Florianópolis",
        estado: "SC",
        cep: "88015-000",
        complemento: "Prédio comercial",
        usuarioId: 2,
      },
      {
        logradouro: "Rua do Sol",
        numero: 45,
        bairro: "Trindade",
        cidade: "Florianópolis",
        estado: "SC",
        cep: "88025-001",
        complemento: "Próximo à UFSC",
        usuarioId: 3,
      },
      {
        logradouro: "Rua das Palmeiras",
        numero: 27,
        bairro: "Estreito",
        cidade: "Florianópolis",
        estado: "SC",
        cep: "88080-120",
        complemento: "Casa azul com garagem",
        usuarioId: 4,
      },
      {
        logradouro: "Avenida Rio Branco",
        numero: 500,
        bairro: "Centro",
        cidade: "Florianópolis",
        estado: "SC",
        cep: "88015-001",
        complemento: "Perto do shopping",
        usuarioId: 5,
      },
    ]
    await queryInterface.bulkInsert('enderecos', dados, {});
    
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('enderecos', null, {});
     
  }
};
