import { Router,Request,Response } from "express";
import { deletePlayer, findAllPlayers, findPlayerById, saveNewPlayer, updatePlayer } from "../models/players";
import { NewPlayerDTO, UpdatePlayerDTO } from "../DTO/playerDTO";


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
 *         description: The player ID din dummer
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
 *       200:
 *         description: Player updated successfully
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
    // req.body kommer innehålla JSON med de nya värdena för spelaren
    // req.params.id kommer innehålla id för den spelare som ska uppdateras
    const playerId = parseInt(req.params.id as string);
    const updatePlayerDTO = req.body as UpdatePlayerDTO;
    const updatedPlayer = await updatePlayer(playerId, updatePlayerDTO.name, updatePlayerDTO.jersey);
    return res.status(200).json(updatedPlayer);
    // skapa en update query som uppdaterar spelaren med de nya värdena där id matchar
    // returnera status 200 och den uppdaterade spelaren som JSON
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
 *       204:
 *         description: Player deleted successfully

 */
playerRouter.delete("/:id", async (req: Request, res: Response) => {
    // req.params.id kommer innehålla id för den spelare som ska raderas
    const playerId = parseInt(req.params.id as string);
    await deletePlayer(playerId);
    res.status(204).send();
    // skapa en delete query som raderar spelaren där id matchar
    // returnera status 204 No Content
});

export default playerRouter;