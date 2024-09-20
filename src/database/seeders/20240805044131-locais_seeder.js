'use strict';

const { obterLocal } = require('../../services/geoFinder'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      const locais = [
        {
          nomeLocal: 'Academia Central',
          descricao: 'Academia com diversos equipamentos para musculação e aerobica.',
          localidade: 'Rua das Palmeiras, nº 100',
          cep: '20271190',
          praticasPermitidas: 'Musculação, Aeróbica, Yoga',
          idUsuario: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        {
          nomeLocal: 'Parque das Aves',
          descricao: 'Parque ao ar livre ideal para caminhadas e esportes ao ar livre.',
          localidade: 'Avenida das Aves, nº 250',
          cep: '30672250',
          praticasPermitidas: 'Caminhada, Corrida, Yoga',
          idUsuario: 2, 
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        {
          nomeLocal: 'Centro de Treinamento Fitness',
          descricao: 'Centro de treinamento especializado em esportes de alta performance.',
          localidade: 'Praça da Vitória, nº 15',
          cep: '05653070',
          praticasPermitidas: 'Treinamento funcional, Crossfit',
          idUsuario: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        {
          nomeLocal: 'Clube de Corrida',
          descricao: 'Clube dedicado a corridas e eventos de atletismo.',
          localidade: 'Rua das Flores, nº 55',
          cep: '40050565',
          praticasPermitidas: 'Corrida, Atletismo',
          idUsuario: 4, 
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        {
          nomeLocal: 'Estúdio de Yoga Zen',
          descricao: 'Estúdio de yoga com aulas para todas as idades e níveis.',
          localidade: 'Rua da Paz, nº 77',
          cep: '90810240',
          praticasPermitidas: 'Yoga, Meditação',
          idUsuario: 5, 
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        {
          nomeLocal: 'Ginásio de Lutas',
          descricao: 'Ginásio especializado em artes marciais e esportes de combate.',
          localidade: 'Rua dos Lutadores, nº 89',
          cep: '88047401',
          praticasPermitidas: 'Jiu-Jitsu, Muay Thai, Boxe',
          idUsuario: 6, 
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        {
          nomeLocal: 'Academia de Dança',
          descricao: 'Academia dedicada à prática de diversas modalidades de dança.',
          localidade: 'Avenida das Artes, nº 120',
          cep: '88070730',
          praticasPermitidas: 'Dança clássica, Dança moderna, Hip Hop',
          idUsuario: 7, 
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        {
          nomeLocal: 'Centro de Natação',
          descricao: 'Centro especializado em natação para todas as idades.',
          localidade: 'Rua dos Nadadores, nº 200',
          cep: '80250070',
          praticasPermitidas: 'Natação',
          idUsuario: 8, 
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        {
          nomeLocal: 'Centro de Fitness',
          descricao: 'Centro de fitness com diversas opções de atividades físicas.',
          localidade: 'Rua do Esporte, nº 300',
          cep: '05001200',
          praticasPermitidas: 'Musculação, Cardio',
          idUsuario: 9, 
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        {
          nomeLocal: 'Academia Personal',
          descricao: 'Academia com foco em treino personalizado.',
          localidade: 'Rua dos Treinadores, nº 400',
          cep: '11075501',
          praticasPermitidas: 'Treino Personalizado, Musculação',
          idUsuario: 10, 
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }
      ];

      // Atualizar latitude e longitude para cada local
      for (let local of locais) {
        const { lat, lng } = await obterLocal(local.cep);
        local.latitude = lat;
        local.longitude = lng;
      }

      await queryInterface.bulkInsert('locais', locais, {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('locais', null, {});
  }
};