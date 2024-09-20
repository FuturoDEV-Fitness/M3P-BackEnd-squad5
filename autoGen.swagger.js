const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info:{
        title: 'API Exercita 365',
        description: 'API de locais fitness',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    security: [{'apiKeyAuth': []}],
    securityDefinitions: {
        apiKeyAuth:{
            type: 'apiKey',
            in:'header',
            name: "Authorization",
            description: "Bearer <token>"
        }
    }
}

const arquivoSaida = './src/routes/doc.swagger.json'
const arquivoRotas = ['./src/routes/routes.js']

swaggerAutogen(arquivoSaida, arquivoRotas, doc)