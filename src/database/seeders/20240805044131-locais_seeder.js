"use strict";

const { obterLocal } = require("../../services/geoFinder");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
     
  
      // // Atualizar latitude e longitude para cada local
      // for (let local of locais) {
      //   const { lat, lng } = await obterLocal(local.cep);
      //   local.latitude = lat;
      //   local.longitude = lng;
      // }

    //await 
    return queryInterface.bulkInsert("locais", [
      {
        nomeLocal: 'Academia Central',
        descricaoLocal: 'Academia com diversos equipamentos para musculação e aeróbica.',
        cep: '20271190',
        endereco: 'Rua das Palmeiras, nº 100',
        bairro: 'Centro',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        id_usuario: 1 
      },
      {
        nomeLocal: 'Parque das Aves',
        descricaoLocal: 'Parque ao ar livre ideal para caminhadas e esportes ao ar livre.',
        cep: '30672250',
        endereco: 'Avenida das Aves, nº 250',
        bairro: 'Aves',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        id_usuario: 2 
      },
      {
        nomeLocal: 'Centro de Treinamento Fitness',
        descricaoLocal: 'Centro de treinamento especializado em esportes de alta performance.',
        cep: '05653070',
        endereco: 'Praça da Vitória, nº 15',
        bairro: 'Vitória',
        cidade: 'São Paulo',
        estado: 'SP',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        id_usuario: 3 
      },
      {
        nomeLocal: 'Clube de Corrida',
        descricaoLocal: 'Clube dedicado a corridas e eventos de atletismo.',
        cep: '40050565',
        endereco: 'Rua das Flores, nº 55',
        bairro: 'Flora',
        cidade: 'Salvador',
        estado: 'BA',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        id_usuario: 4 
      },
      {
        nomeLocal: 'Estúdio de Yoga Zen',
        descricaoLocal: 'Estúdio de yoga com aulas para todas as idades e níveis.',
        cep: '90810240',
        endereco: 'Rua da Paz, nº 77',
        bairro: 'Paz',
        cidade: 'Porto Alegre',
        estado: 'RS',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        id_usuario: 5 
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("locais", null, {});
  },
};
