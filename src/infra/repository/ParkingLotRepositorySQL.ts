import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";
import database from "../database/database"

export default class ParkingLotRepositorySQL implements ParkingLotRepository {

    async getParkingLot(code: string): Promise<ParkingLot> {
        const parkingLotData = await database.manyOrNone("select *, (select count(*) from \"parkedCar\" pc where pc.code = pl.code) as occupiedspaces from \"parkingLot\" pl where pl.code = $1", [code]);
        if(parkingLotData && parkingLotData.length > 0){
            return ParkingLotAdapter.create(parkingLotData[0].code, Number(parkingLotData[0].capacity), Number(parkingLotData[0].open_hour), Number(parkingLotData[0].close_hour), Number(parkingLotData[0].occupiedspaces));
        }
    }

    async saveParkingLot(code:string, capacity:number, openHour:number, closeHour:number): Promise<void> {
        await database.none("insert into \"parkingLot\" (code, capacity, open_hour, close_hour) values ($1, $2, $3, $4)", [code, capacity, openHour, closeHour])
    }
}