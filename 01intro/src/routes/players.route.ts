import { Router,Request,Response } from "express";
import { findAllPlayers } from "../models/players";


const playerRouter = Router();

playerRouter.get("/", async (req: Request, res: Response) => {
    const players = await findAllPlayers();
    res.json(players);
});

export default playerRouter;