import { RowDataPacket } from "mysql2";
import { connection } from "./database";


export interface Player extends RowDataPacket {
    id: number;
    namn: string;
    jersey: number;

}

export async function findAll() : Promise<Player[]> {
    const conn = await connection
    const [rows] = await conn.query<Player[]>("SELECT * FROM player", [])
    return rows
}

export async function findByName(name:string) : Promise<Player|null>{
    const conn = await connection
    const [rows] = await conn.query<Player[]>("SELECT * FROM player WHERE namn=?", [name])
    if(rows.length == 0) {
        return null
    }
    return rows[0]
}
