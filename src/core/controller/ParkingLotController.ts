import ParkedCarRepositorySQL from "../../infra/repository/ParkedCarRepositorySQL";
import ParkingLotRepositorySQL from "../../infra/repository/ParkingLotRepositorySQL";
import ParkedCarService from "../service/ParkedCarService";
import ParkingLotService from "../service/ParkingLotService";

export default class ParkingLotController {
    
    static async getParkingLot(params, body){
        const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
        const pklotService = new ParkingLotService(parkingLotRepositorySQL);

        const parkedCarRepositorySQL = new ParkedCarRepositorySQL();
        const pkcarService = new ParkedCarService(parkedCarRepositorySQL);
        const parkedCar = await pkcarService.getParkedCar(params.code, params.plate)

        const parkingLot = await pklotService.getParkingLot(params.code, parkedCar.date);
        return parkingLot;
    }

    static async enterParkingLot(params, body){
        const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
        const service = new ParkingLotService(parkingLotRepositorySQL);
        service.enterParkingLot(body.code, body.capacity, body.openHour, body.closeHour);
        return {"status":200};
    }
}