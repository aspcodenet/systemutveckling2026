import express, { Express, Request, Response } from "express";
import { getAllMessages } from "./models/message";
import messageRouter from "./routes/message.route";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import playerRouter from "./routes/players.route";

const app: Express = express();
app.use(express.json()); // IMPORTANT! This middleware is needed to parse JSON request bodies!
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;


app.use("/api/messages", messageRouter);
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
  apis: ['./src/routes/*.ts'], // files containing annotations as above
};
 
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Detta är händelsestyrd programmering, när en request kommer in så körs den callback som är kopplad till den route som matchar requesten
// app.get("/test", (req: Request, res: Response) => {
//     res.json(getAllMessages());
//   });

   
app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}); 

  // app.post