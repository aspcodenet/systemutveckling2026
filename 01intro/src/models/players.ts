import { RowDataPacket } from "mysql2/promise";
import { connection } from "./db";

export interface Player extends RowDataPacket {
    id: number;
    name: string;
    jersey: number;
}

export async function findAllPlayers() : Promise<Player[]>{
    let conn = await connection;
    const [rows] = await conn.query<Player[]>("SELECT * FROM player", [])
    return rows
}

export async function findPlayerById(id: number) : Promise<Player | null>{
    let conn = await connection;
    const [rows] = await conn.query<Player[]>("SELECT * FROM player WHERE id = ?", [id])
    return rows[0] || null;
}
