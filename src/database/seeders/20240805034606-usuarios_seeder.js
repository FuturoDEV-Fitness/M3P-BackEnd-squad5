'use strict';

const { hashSync } = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'João Elias',
        sexo: 'masculino',
        cpf: '66611166688',
        email: 'joao@exemplo.com',
        endereco: 'Rua das Acácias, Bairro: Nações, nº119',
        senha: hashSync('1234567890', 10),
        dataNascimento: '1990-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        nome: 'Maria Silva',
        sexo: 'feminino',
        cpf: '22233344455',
        email: 'maria@exemplo.com',
        endereco: 'Avenida Paulista, nº 500',
        senha: hashSync('1234hytgrw', 10),
        dataNascimento: '1985-07-15',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        nome: 'Pedro Oliveira',
        sexo: 'outro',
        cpf: '33344455566',
        email: 'pedro@exemplo.com',
        endereco: 'Rua das Flores, nº 200',
        senha: hashSync('password56', 10),
        dataNascimento: '1992-03-22',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        nome: 'Ana Costa',
        sexo: 'feminino',
        cpf: '44455566677',
        email: 'ana@exemplo.com',
        endereco: 'Rua do Sol, nº 45, Bairro Jardim',
        senha: hashSync('qwerty1234', 10),
        dataNascimento: '1988-11-30',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        nome: 'Lucas Martins',
        sexo: 'masculino',
        cpf: '55566677788',
        email: 'lucas@exemplo.com',
        endereco: 'Praça da Sé, nº 10',
        senha: hashSync('abc1234561', 10),
        dataNascimento: '1995-06-10',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        nome: 'Fernanda Almeida',
        sexo: 'outro',
        cpf: '66677788899',
        email: 'fernanda@exemplo.com',
        endereco: 'Rua das Palmeiras, nº 78',
        senha: hashSync('password00', 10),
        dataNascimento: '1993-12-25',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        nome: 'Carlos Souza',
        sexo: 'masculino',
        cpf: '77788899900',
        email: 'carlos@exemplo.com',
        endereco: 'Rua da Paz, nº 33',
        senha: hashSync('mypassword',  10),
        dataNascimento: '1980-09-15',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        nome: 'Patrícia Lima',
        sexo: 'feminino',
        cpf: '88899900011',
        email: 'patricia@exemplo.com',
        endereco: 'Avenida Brasil, nº 120',
        senha: hashSync('securepass',  10),
        dataNascimento: '1991-02-28',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        nome: 'Renato Ribeiro',
        sexo: 'masculino',
        cpf: '99900011122',
        email: 'renato@exemplo.com',
        endereco: 'Rua da Liberdade, nº 250',
        senha: hashSync('mysecret31',  10),
        dataNascimento: '1987-10-05',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        nome: 'Juliana Pereira',
        sexo: 'feminino',
        cpf: '00011122233',
        email: 'juliana@exemplo.com',
        endereco: 'Rua dos Anjos, nº 99',
        senha: hashSync('pass123450',  10),
        dataNascimento: '1994-04-14',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
      
    ], {});
  },


  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('usuarios', null, {});
     
  }
};
