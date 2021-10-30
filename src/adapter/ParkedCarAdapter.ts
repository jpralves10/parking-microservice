import ParkedCar from "../core/entity/ParkedCar";

export default class ParkedCarAdapter {
    static create (code: string, plate: string, date: Date){
        return new ParkedCar(code, plate, date);
    }
}