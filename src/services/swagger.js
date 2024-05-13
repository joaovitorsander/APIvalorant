const swaggerAutogen = require('swagger-autogen')('pt-BR')

const doc = {
    info : {
        version: "1.0.0",
        title: "API Camp Valorant",
        description: "Documentação da API Camp Valorant"
    },
    host: 'localhost:3000',
    basePath: "",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
}

const outputFile = './src/docs/swagger.yaml';
//const endpointsFiles = ['./src/routes/aluno.js'];

swaggerAutogen(outputFile, doc);