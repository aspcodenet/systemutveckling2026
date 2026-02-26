import { RowDataPacket } from "mysql2";
import { connection } from "./database";


export interface Player extends RowDataPacket {
    id: number;
    namn: string;
    jersey: number;

}

export async function findById(id:number) : Promise<Player|null>{
    const conn = await connection
    const [rows] = await conn.query<Player[]>("SELECT * FROM player WHERE id=?", [id])
    if(rows.length == 0) {
        return null
    }
    return rows[0]
}   


export async function updateById(id:number, name:string, jersey:number) : Promise<void>{
    const conn = await connection
    await conn.query("UPDATE player SET namn=?, jersey=? WHERE id=?", [name, jersey, id])
}

export async function deleteById(id:number) : Promise<void>{
    const conn = await connection
    await conn.query("DELETE FROM player WHERE id=?", [id])
}
export async function create(name:string, jersey:number) : Promise<void>{
    const conn = await connection
    await conn.query("INSERT INTO player (namn, jersey) VALUES (?, ?)", [name, jersey])
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
