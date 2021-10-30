import ParkedCarRepositorySQL from "../../infra/repository/ParkedCarRepositorySQL";
import ParkingLotRepositorySQL from "../../infra/repository/ParkingLotRepositorySQL";
import ParkedCarService from "../service/ParkedCarService";
import ParkingLotService from "../service/ParkingLotService";

export default class ParkedCarController {
    
    static async getParkedCar(params, body){
        const parkedCarRepositorySQL = new ParkedCarRepositorySQL();
        const pkcarService = new ParkedCarService(parkedCarRepositorySQL);
        const parkedCar = await pkcarService.getParkedCar(params.code, params.plate)
        return parkedCar;
    }

    static async enterParkedCar(params, body){
        const parkedCarRepositorySQL = new ParkedCarRepositorySQL();
        const service = new ParkedCarService(parkedCarRepositorySQL);
        const parkingLot = service.enterParkedCar(
            body.code, body.plate, body.date);
        return {"status": 200};
    }
}