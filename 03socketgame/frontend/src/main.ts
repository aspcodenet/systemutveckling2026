import { Socket,io } from "socket.io-client";
import { allTrucks, getMyTruck, Truck } from "./truck";

const truckWitdh = 50;
const truckHeight = 30;






// Choose backend URL: localhost -> dev server, otherwise use current origin.
const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const serverOrigin = isLocalhost
    ? 'http://localhost:3000'
    : `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;

// Use /api/socket.io path in production to match ingress that exposes /api
const socket: Socket =      io(serverOrigin, { path: '/api/socket.io' });

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
    });      

socket.on('allTrucks', (data) => {
    allTrucks.splice(0,allTrucks.length)
    data.forEach((element: Truck) => {
        allTrucks.push(element)
    });
});



// game.ts

const playerName = document.getElementById('playerName') as HTMLInputElement;
const playerColor= document.getElementById('playerColor') as HTMLInputElement;

// Get the canvas and context
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Keyboard state
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// Event listeners for keyboard input
window.addEventListener('keydown', (e) => {
    if (e.key in keys) {
        keys[e.key as keyof typeof keys] = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key in keys) {
        keys[e.key as keyof typeof keys] = false;
    }
});


const image = new Image(1000, 800); // Using optional size for image
image.src = "back.png";

function drawMap() {
    ctx.drawImage(image, 0, 0);
}

// Draw the truck
function drawTruck(truck:Truck) {
    ctx.save();



    ctx.translate(truck.x, truck.y);
    ctx.rotate(truck.angle);

    ctx.drawImage(image, -truckWitdh / 2, -truckHeight / 2, truckWitdh, truckHeight);

    // Truck body
    ctx.fillStyle = truck.color;
    ctx.fillRect(-truckWitdh / 2, -truckHeight / 2, truckWitdh, truckHeight);

    // Truck cabin
    ctx.fillStyle = 'darkblue';
    ctx.fillRect(truckWitdh / 2 - 10, -truckHeight / 2, 10, truckHeight);

    ctx.restore();

    ctx.save();
    ctx.font = "30px serif"
    ctx.fillStyle = "#FF0000";
    ctx.fillText (
        truck.name, 
        truck.x, truck.y+50);    


}


function otherTrucks(){
  //
  for(let truck of allTrucks  ){
    if(truck.id.toString() !== socket.id?.toString()){
        drawTruck(truck)            
    }
  }
  
}


// Update truck position based on keyboard input
function moveTruckBasedOnKeyboardInput(truck:Truck): Boolean{
    let changed:Boolean  = false;
    if (keys.ArrowUp) {
        truck.x += Math.cos(truck.angle);
        truck.y += Math.sin(truck.angle);
        changed = true;
    }
    if (keys.ArrowDown) {
        truck.x -= Math.cos(truck.angle);
        truck.y -= Math.sin(truck.angle);
        changed = true;
    }
    if (keys.ArrowLeft) {
        truck.angle -= 0.05;
        changed = true;
    }
    if (keys.ArrowRight) {
        truck.angle += 0.05;
        changed = true;
    }

    // Keep the truck within the canvas bounds
    truck.x = Math.max(0, Math.min(canvas.width, truck.x));
    truck.y = Math.max(0, Math.min(canvas.height, truck.y));
    return changed;
}

// Game loop
function gameLoop() {
    drawMap();
    if(socket.connected && socket.id){
        let myTruck = getMyTruck(socket.id.toString());
        if(myTruck !== undefined){
            let changed = moveTruckBasedOnKeyboardInput(myTruck);
            if(playerName.value !== myTruck.name){
                changed = true;                
                myTruck.name = playerName.value;
            }
            if(playerColor.value !== myTruck.color){
                changed = true;                
                myTruck.color = playerColor.value;
            }
            drawTruck(myTruck);
    
            if(changed){
                socket.emit('moveTruck', { id: socket.id, name: myTruck.name, x: myTruck.x, y: myTruck.y, angle: myTruck.angle, color: myTruck.color });
            }
        }
        otherTrucks()
    }
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();