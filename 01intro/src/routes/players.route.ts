import { Router,Request,Response } from "express";
import { deletePlayer, findAllPlayers, findPlayerById, savePlayer, updatePlayer } from "../models/players";
import { NewPlayerDTO, UpdatePlayerDTO } from "../DTO/playerdto";


const playerRouter = Router();

playerRouter.get("/", async (req: Request, res: Response) => {
    const players = await findAllPlayers();
    res.json(players);
});

playerRouter.get("/:id", async (req: Request, res: Response) => {
    const playerId = parseInt(req.params.id as string);
    const player = await findPlayerById(playerId);
    if (player) {
        res.json(player);
    } else {
        res.status(404).json({ message: "Player not found" });
    }
});

playerRouter.post("/", async (req: Request, res: Response) => {
    // Here you would typically add code to create a new player in the database
    const newPlayerDTO : NewPlayerDTO = req.body as NewPlayerDTO;
    const newPlayer = savePlayer(newPlayerDTO.name, newPlayerDTO.jersey);
    res.status(201).json({ message: "Player created" });
});

playerRouter.put("/:id", async (req: Request, res: Response) => {
    // Here you would typically add code to update an existing player in the database
    const playerId = parseInt(req.params.id as string);
    const updatePlayerDTO : UpdatePlayerDTO = req.body as UpdatePlayerDTO;
    const player = await findPlayerById(playerId);
    if (!player) {
        res.status(404).json({ message: "Player not found" });
        return;
    }
    const updatedPlayer = await updatePlayer(playerId, updatePlayerDTO);
    res.status(200).json(updatedPlayer);
});

playerRouter.delete("/:id", async (req: Request, res: Response) => {
    // Here you would typically add code to delete a player from the database
    const playerId = parseInt(req.params.id as string);
    const player = await findPlayerById(playerId);
    if (!player) {
        res.status(404).json({ message: "Player not found" });
        return;
    }
    await deletePlayer(playerId);
    res.status(200).json({ message: "Player deleted" });
});


export default playerRouter;