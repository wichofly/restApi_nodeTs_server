import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Products',
        description:
          'API operations related to products and their management in the database',
      },
    ],
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the application products',
    },
  },
  apis: ['./src/router.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
