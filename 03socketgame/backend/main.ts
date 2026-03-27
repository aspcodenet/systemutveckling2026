import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { allTrucks, Truck } from './data/truck';

const app = express();
app.use(cors())
const server = http.createServer(app);
const io = new Server(server,{
  path: '/api/socket.io',
  cors:{
    origin: "*"
  }
});




io.on('connection', (socket: Socket) => {
  console.log('A user connected:', socket.id);
  let truck = new Truck(socket.id, "New", Math.floor(Math.random() * 950 + 50), Math.floor(Math.random() * 750 + 50), 0, "#000000");
  allTrucks.push(truck);

  io.emit('allTrucks', allTrucks);


  // Handle move truck
  socket.on('moveTruck', (data: { id: string; name: string, x:number, y:number, angle:number, color:string }) => {
    let truck = allTrucks.find((truck) => truck.id === data.id);
    if(!truck){
      truck = new Truck(data.id, data.name, data.x, data.y, data.angle, data.color);
      allTrucks.push(truck);
    }
    truck.x = data.x;   
    truck.y = data.y;
    truck.color = data.color;
    truck.name = data.name;
    truck.angle = data.angle;
    io.emit('allTrucks', allTrucks);
});

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    let index = allTrucks.findIndex((truck) => truck.id === socket.id)
    allTrucks.splice(index, 1);
    console.log(allTrucks)
    io.emit('allTrucks', allTrucks);
  });
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});