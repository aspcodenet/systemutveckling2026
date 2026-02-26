import { Router, Request, Response } from "express";
import { findAll } from "../models/player";

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


export default playerRouter;


