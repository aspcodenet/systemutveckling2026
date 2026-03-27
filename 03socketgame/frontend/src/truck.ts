export class Truck{
    
    constructor(public id:string, public name:string, public x:number, public y:number,public angle:number,public color:string){
    }
}

export const allTrucks:Truck[] = []

export const getMyTruck = (socketId:string) => allTrucks.find((truck) => truck.id === socketId);