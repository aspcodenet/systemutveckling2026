"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var truck_1 = require("./data/truck");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    path: '/api/socket.io',
    cors: {
        origin: "*"
    }
});
io.on('connection', function (socket) {
    console.log('A user connected:', socket.id);
    var truck = new truck_1.Truck(socket.id, "New", Math.floor(Math.random() * 950 + 50), Math.floor(Math.random() * 750 + 50), 0, "#000000");
    truck_1.allTrucks.push(truck);
    io.emit('allTrucks', truck_1.allTrucks);
    // Handle move truck
    socket.on('moveTruck', function (data) {
        var truck = truck_1.allTrucks.find(function (truck) { return truck.id === data.id; });
        if (!truck) {
            truck = new truck_1.Truck(data.id, data.name, data.x, data.y, data.angle, data.color);
            truck_1.allTrucks.push(truck);
        }
        truck.x = data.x;
        truck.y = data.y;
        truck.color = data.color;
        truck.name = data.name;
        truck.angle = data.angle;
        io.emit('allTrucks', truck_1.allTrucks);
    });
    // Handle disconnection
    socket.on('disconnect', function () {
        console.log('A user disconnected:', socket.id);
        var index = truck_1.allTrucks.findIndex(function (truck) { return truck.id === socket.id; });
        truck_1.allTrucks.splice(index, 1);
        console.log(truck_1.allTrucks);
        io.emit('allTrucks', truck_1.allTrucks);
    });
});
var PORT = 3000;
server.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
