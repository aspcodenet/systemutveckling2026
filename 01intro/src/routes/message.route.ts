import { Router, Request, Response } from "express";
import { getAllMessages } from "../models/message";

const messageRouter = Router();


/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Retrieve a list of messages
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                     example: Teacher
 *                   user:
 *                     type: string
 *                     example: John Doe
 *           */
 messageRouter.get("/", (req: Request, res: Response) => {
    res.json(getAllMessages());
  });

export default messageRouter;
