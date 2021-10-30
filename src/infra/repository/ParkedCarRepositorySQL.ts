import ParkedCarAdapter from "../../adapter/ParkedCarAdapter";
import ParkedCar from "../../core/entity/ParkedCar";
import ParkedCarRepository from "../../core/repository/ParkedCarRepository";
import database from "../database/database"

export default class ParkedCarRepositorySQL implements ParkedCarRepository {

    async getParkedCar(code:string, plate:string): Promise<ParkedCar> {
        const parkedCarData = await database.manyOrNone("select * from \"parkedCar\" pl where pl.code = $1 and pl.plate = $2", [code, plate]);
        if(parkedCarData && parkedCarData.length > 0){
            return ParkedCarAdapter.create(parkedCarData[0].code, parkedCarData[0].plate, new Date(parkedCarData[0].date));
        }
    }

    async saveParkedCar(code:string, plate:string, date:Date): Promise<void> {
        await database.none("insert into \"parkedCar\" (code, plate, date) values ($1, $2, $3)", [code, plate, date])
    }
}