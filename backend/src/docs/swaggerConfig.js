// src/docs/swaggerConfig.js
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gerenciador de Despesas API',
      version: '1.0.0',
      description: 'Documentação da API do Gerenciador de Despesas',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  // Caminho absoluto e seguro para encontrar os arquivos com as anotações do Swagger
  apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

