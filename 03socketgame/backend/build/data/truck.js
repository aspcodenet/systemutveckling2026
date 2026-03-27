"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTrucks = exports.Truck = void 0;
var Truck = /** @class */ (function () {
    function Truck(id, name, x, y, angle, color) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.color = color;
    }
    return Truck;
}());
exports.Truck = Truck;
exports.allTrucks = [];
