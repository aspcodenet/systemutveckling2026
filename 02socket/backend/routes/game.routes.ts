import { Router,Request,Response } from "express";
import { getIo } from "../socket";


class Game{
    constructor(team1:string, team2:string){
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.team1 = team1;
        this.team2 = team2;
    }
    id:string;
    team1:string;
    team2:string;
    score1:number = 0;
    score2:number = 0;

};


const games:Game[] = [];

function initGames(){
    games.push(new Game("Modo","AIK"));
    games.push(new Game("Hammarby","Djurgården"));
    games.push(new Game("Bayern","Dortmund"));
}




const gameRouter = Router();

gameRouter.get("/",(req:Request,res:Response)=>{
    res.json(games);
});

gameRouter.put("/:id",(req:Request,res:Response)=>{
    const {id} = req.params;
    const {score1, score2} = req.body;
    const game = games.find(g => g.id === id);
    if(!game){
        return res.status(404).json({message:"Game not found"});
    }
    if(score1 !== undefined){
        game.score1 = score1;
    }
    if(score2 !== undefined){   
        game.score2 = score2;
    }
    try{
        getIo().to(id).emit('gameUpdate', game);
    }catch(e){
        // Socket.IO not initialized yet; ignore emit
    }
    res.json(game);
});


gameRouter.get("/:id",(req:Request,res:Response)=>{
    const {id} = req.params;
    const game = games.find(g => g.id === id);
    if(!game){
        return res.status(404).json({message:"Game not found"});
    }   
    res.json(game);
});


gameRouter.post("/",(req:Request,res:Response)=>{
    const {team1, team2} = req.body;
    if(!team1 || !team2){
        return res.status(400).json({message:"team1 and team2 are required"});
    }
    const game = new Game(team1, team2);
    games.push(game);
    res.status(201).json(game);
});


export { gameRouter, initGames };