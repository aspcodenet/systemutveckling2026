import { Router,Request,Response } from "express";
import { deletePlayer, findAllPlayers, findPlayerById, savePlayer, updatePlayer } from "../models/players";
import { NewPlayerDTO, UpdatePlayerDTO } from "../DTO/playerdto";


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
 *                     example: John Doe
 *                   jersey:
 *                     type: number
 *                     example: 10
 *           */

playerRouter.get("/", async (req: Request, res: Response) => {
    const players = await findAllPlayers();
    res.json(players);
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
 *           */

playerRouter.get("/:id", async (req: Request, res: Response) => {
    const playerId = parseInt(req.params.id as string);
    const player = await findPlayerById(playerId);
    if (player) {
        res.json(player);
    } else {
        res.status(404).json({ message: "Player not found" });
    }
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
    // Here you would typically add code to create a new player in the database
    console.log(req.body)
    const newPlayerDTO : NewPlayerDTO = req.body as NewPlayerDTO;
    const newPlayer = await savePlayer(newPlayerDTO.name, newPlayerDTO.jersey);
    res.status(201).json(newPlayer);
});



/**
 * @swagger
 * /api/players/{id}:
 *   put:
 *     summary: Update an existing player
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The player ID
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


/** * @swagger
 * /api/players/{id}:
 *   delete:
 *     summary: Delete a player
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The player ID
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *       404:
 *         description: Player not found
 */
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