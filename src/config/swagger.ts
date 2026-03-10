import swaggerJSDoc from 'swagger-jsdoc';
import {env} from "./env";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Subscriptions tracker API",
            version: "1.0.0",
            description: "API for tracking subscriptions and recurring payments"
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Local server"
            },
            {
                url: `https://${env.PRODUCTION_URL}`,
                description: "Production server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.ts']
});