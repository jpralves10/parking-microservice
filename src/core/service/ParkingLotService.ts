import ParkedCar from "../entity/ParkedCar";
import ParkedCarRepository from "../repository/ParkedCarRepository";
import ParkingLotRepository from "../repository/ParkingLotRepository";

export default class ParkingLotService {

    parkingLotRepository: ParkingLotRepository;

    constructor(
        parkingLotRepository: ParkingLotRepository
    ){
        this.parkingLotRepository = parkingLotRepository;
    }

    async getParkingLot(code:string, date?:Date){
        const parkingLot = await this.parkingLotRepository.getParkingLot(code);

        if(parkingLot && !parkingLot.isOpen(date || new Date())) throw new Error('The parking lot is closed');
        if(parkingLot && parkingLot.isFull()) throw new Error('The parking lot is full')

        return parkingLot;
    }

    enterParkingLot(code: string, capacity: number, openHour: number, closeHour: number){
       this.parkingLotRepository.saveParkingLot(code, capacity, openHour, closeHour)
    }
}