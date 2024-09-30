// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Dashboard',
      version: '1.0.0',
      description: 'Documentação das rotas do dashboard',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos de rota
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
