import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Project Management API",
    version: "1.0.0",
    description:
      "A comprehensive project management system API with user authentication, project management, task tracking, team collaboration, and commenting features.",
    contact: {
      name: "API Support",
      email: "support@projectmanagement.com",
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Path to the API files
};

export const swaggerSpec = swaggerJSDoc(options);
