import ParkingLot from "../entity/ParkingLot";

export default interface ParkingLotRepository {
    getParkingLot(code:string) : Promise<ParkingLot>;
    saveParkingLot(code: string, capacity: number, openHour: number, closeHour: number) : void;
}