'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('praticas', [
      {
        nome: ['caminhada', 'corrida', 'musculação', 'esportes coletivos'],  
        id_local: 1,          
        
      },
      {
        nome: ['esportes coletivos', 'musculação'],
        id_local: 2,          
        
      },
      {
        nome: ['natação', 'esportes coletivos'],
        id_local: 3,          
        
      },
      {
        nome: ['musculação', 'caminhada', 'corrida'],
        id_local: 4,          
        
      },
      {
        nome: ['surf', 'natação', 'esportes coletivos'],
        id_local: 5,          
        
      },
      {
        nome: ['esportes coletivos', 'caminhada', 'corrida', 'musculação'], 
        id_local: 6,          
        
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('praticas', null, {});
  }
};
