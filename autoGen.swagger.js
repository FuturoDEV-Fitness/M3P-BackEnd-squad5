const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info:{
        title: 'GJM Exercises',
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