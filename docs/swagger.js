const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Elta Healthcare API',
      version: '1.0.0',
      description: 'API for managing Elta Healthcare services',
    },
    servers: [
      {
        url: 'http://localhost:9876',
      },
    ],
  },
  apis: ['./routes/*.js'],  // Correctly specify where your routes are located
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
