import express, { Express, Request, Response } from "express";
import { getAllMessages } from "./models/message";

const app: Express = express();
const port = process.env.PORT || 3000;

// Detta är händelsestyrd programmering, när en request kommer in så körs den callback som är kopplad till den route som matchar requesten
app.get("/test", (req: Request, res: Response) => {
    res.json(getAllMessages());
  });

   
app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}); 

  // app.post