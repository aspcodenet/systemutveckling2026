import express, { Express } from "express";
import dotenv from "dotenv";
import appRouter from "./routers/app.router";
import playerRouter from "./routers/player.router";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
 
dotenv.config();
 
const app: Express = express();
const port = process.env.PORT || 3000;
 
app.use("/", appRouter);
app.use("/api/players", playerRouter);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routers/*.ts'], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}); 