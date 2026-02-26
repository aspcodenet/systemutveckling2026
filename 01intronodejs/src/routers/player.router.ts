import { Router, Request, Response } from "express";
import { create, deleteById, findAll, findById, updateById } from "../models/player";

const playerRouter = Router(  );


/**
 * @swagger
 * /api/players:
 *   get:
 *     summary: Retrieve a list of players
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   jersey:
 *                     type: integer
 *                     example: 10
 */

playerRouter.get("/", async (_req: Request, res: Response) => {
    const players = await findAll();
    res.json(players);
});

playerRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const player = await findById(Number(id));
    if (player) {
        res.json(player);
    } else {
        res.status(404).json({ message: "Player not found" });
    }
}); 

playerRouter.post("/", async (req: Request, res: Response) => {
    const { name, jersey } = req.body;
    await create(name, jersey);
    res.status(201).json({ message: "Player created" });
});

playerRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    // Implement delete functionality here
    await deleteById(Number(id));
    res.status(200).json({ message: "Player deleted" });
});

playerRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, jersey } = req.body;  
    // Implement update functionality here
    await updateById(Number(id), name, jersey);
    res.status(200).json({ message: "Player updated" });
});

playerRouter.patch("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, jersey } = req.body;
    // Implement partial update functionality here
    const player = await findById(Number(id));
    if (player) {
        const updatedName = name || player.namn;
        const updatedJersey = jersey || player.jersey;
        await updateById(Number(id), updatedName, updatedJersey);
        res.status(200).json({ message: "Player updated" });
    } else {
        res.status(404).json({ message: "Player not found" });
    }
});



export default playerRouter;


