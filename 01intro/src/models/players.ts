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

export async function updatePlayer(id: number, name: string, jersey: number) : Promise<Player|null> {
    let conn = await connection;
    await conn.query("UPDATE player SET namn = ?, jersey = ? WHERE id = ?", [name, jersey, id]);
    const updatedPlayer = await findPlayerById(id);
    return updatedPlayer;
}

export async function saveNewPlayer(name: string, jersey: number) : Promise<Player> {
    let conn = await connection;
    const [result] = await conn.query("INSERT INTO player (namn, jersey) VALUES (?, ?)", [name, jersey]);
    const insertId = (result as any).insertId;
    const player = await findPlayerById(insertId);
    if (!player) {
        throw new Error("Failed to retrieve the newly created player");
    }
    return player;
}

export async function deletePlayer(id: number) : Promise<void> {    
    let conn = await connection;
    await conn.query("DELETE FROM player WHERE id = ?", [id]);
}

