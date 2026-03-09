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

export async function savePlayer(name: string, jersey: number) : Promise<Player> {
    let conn = await connection;
    const [result] = await conn.query("INSERT INTO player (name, jersey) VALUES (?, ?)", [name, jersey]);
    const insertId = (result as any).insertId;
    const player = await findPlayerById(insertId);
    if (!player) {
        throw new Error("Failed to retrieve the newly created player");
    }
    return player;
}

export async function updatePlayer(id: number, updateData: { name?: string; jersey?: number }) : Promise<Player> {
    let conn = await connection;
    const fields = [];
    const values = [];
    if (updateData.name !== undefined) {
        fields.push("name = ?");
        values.push(updateData.name);
    }
    if (updateData.jersey !== undefined) {
        fields.push("jersey = ?");
        values.push(updateData.jersey);
    }
    if (fields.length === 0) {
        throw new Error("No fields to update");
    }
    values.push(id);
    const sql = `UPDATE player SET ${fields.join(", ")} WHERE id = ?`;
    await conn.query(sql, values);
    const updatedPlayer = await findPlayerById(id);
    if (!updatedPlayer) {
        throw new Error("Failed to retrieve the updated player");
    }
    return updatedPlayer;
}

export async function deletePlayer(id: number) : Promise<void> {
    let conn = await connection;
    await conn.query("DELETE FROM player WHERE id = ?", [id]);
}


