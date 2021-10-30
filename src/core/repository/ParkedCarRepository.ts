import ParkedCar from "../entity/ParkedCar";

export default interface ParkedCarRepository {
    getParkedCar(code:string, plate:string) : Promise<ParkedCar>;
    saveParkedCar(code:string, plate:string, date:Date) : void;
}