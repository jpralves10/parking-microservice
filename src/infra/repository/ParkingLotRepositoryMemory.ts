import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";

export default class ParkingLotRepositoryMemory implements ParkingLotRepository {

    parkingLots = [];
    
    getParkingLot(code: string): Promise<ParkingLot> {
        this.parkingLots.push({
            code: "shopping", 
            capacity: 5, 
            openHour: 8, 
            closeHour: 22, 
            occupiedSpaces: 0
        })
        return Promise.resolve(this.parkingLots.pop())
    }

    saveParkingLot(code: string, capacity: number, openHour: number, closeHour: number): void {
        this.parkingLots.push(code, capacity, openHour, closeHour);
    }
}