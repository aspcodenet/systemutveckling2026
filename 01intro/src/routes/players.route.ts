import { Router,Request,Response } from "express";
import { findAllPlayers, findPlayerById, saveNewPlayer } from "../models/players";
import { NewPlayerDTO } from "../DTO/playerDTO";


const playerRouter = Router();

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
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Foppa
 *                   jersey:
 *                     type: number
 *                     example: 10
 *           */

playerRouter.get("/", async (req: Request, res: Response) => {
    const players = await findAllPlayers();
    res.status(200).json(players);
});


/**
 * @swagger
 * /api/players/{id}:
 *   get:
 *     summary: Retrieve a single player by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The player ID
 *     responses:
 *       200:
 *         description: A single player
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   jersey:
 *                     type: number
 *                     example: 10
 *       404:
 *         description: Player not found
 *           */
playerRouter.get("/:id", async (req: Request, res: Response) => {
    // Här

    // ta id från params
    const playerId = parseInt(req.params.id as string);
    const player = await findPlayerById(playerId);
    if (player) {
        res.status(200).json(player);
    } else {
        res.status(404).json({ message: "Player not found" });
    }
 

    // skapa en select där id matchar
    // returnera status 200 och den spelaren som JSON 
});


/**
 * @swagger
 * /api/players:
 *   post:
 *     summary: Create a new player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               jersey:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   jersey:
 *                     type: number
 *                     example: 10
 *           */
playerRouter.post("/", async (req: Request, res: Response) => {
    console.log(req.body)
    const newPlayerDTO : NewPlayerDTO = req.body as NewPlayerDTO;
    const newPlayer = await saveNewPlayer(newPlayerDTO.name, newPlayerDTO.jersey);
    res.status(201).json(newPlayer);
});

export default playerRouter;