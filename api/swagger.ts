import swaggerJSDoc, { type SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My Fake Store API",
    version: "1.0.0",
    description: "A simple API to manage fake store products",
  },
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: ["./api/**/*.ts"], // Path to the API routes in your Node.js application
};

export const swaggerSpec = swaggerJSDoc(options);
