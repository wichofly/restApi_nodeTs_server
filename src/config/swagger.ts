import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';

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

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }', // Hide the top bar
  customSiteTitle: 'Product API Documentation', // Custom title for the documentation page
  explorer: true, // Enable the explorer feature
};

export default swaggerSpec;
export { swaggerUiOptions };
