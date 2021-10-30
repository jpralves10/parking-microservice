import ParkedCarRepository from "../repository/ParkedCarRepository";

export default class ParkedCarService {

    parkedCarRepository: ParkedCarRepository;

    constructor(
        parkedCarRepository: ParkedCarRepository
    ){
        this.parkedCarRepository = parkedCarRepository;
    }

    async getParkedCar(code:string, plate:string){
        return await this.parkedCarRepository.getParkedCar(code, plate);
    }

    enterParkedCar(code: string, plate: string, date: Date){
        this.parkedCarRepository.saveParkedCar(code, plate, date);
    }
}