import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SmartCar API',
      version: '1.0.0',
      description: 'API documentation for the SmartCar project',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js', './src/index.js'], // Paths to files containing OpenAPI definitions
}

const specs = swaggerJsdoc(options)

export default specs
