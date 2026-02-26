import { Router, Request, Response } from "express";
import { getAllMessages } from "../models/message";

const router = Router();

router.get("/test", (_req: Request, res: Response) => {
  res.json(getAllMessages());
});

router.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default router;
