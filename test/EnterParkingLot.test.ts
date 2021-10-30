import ParkedCarService from "../src/core/service/ParkedCarService";
import ParkingLotService from "../src/core/service/ParkingLotService";
import ParkedCarRepositorySQL from "../src/infra/repository/ParkedCarRepositorySQL";
import ParkingLotRepositorySQL from "../src/infra/repository/ParkingLotRepositorySQL";

function fabrica(tipo:string){
    if(tipo == "parkingLot"){
        const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
        return new ParkingLotService(parkingLotRepositorySQL);
    }else{
        const parkedCarRepositorySQL = new ParkedCarRepositorySQL();
        return new ParkedCarService(parkedCarRepositorySQL);
    }
}

test.skip("Should get parking lot", async function(){
    const service = fabrica("parkingLot") as ParkingLotService;
    const parkingLot = await service.getParkingLot("shopping", new Date("2021-10-11T10:00:00"));
    expect(parkingLot.code).toBe("shopping")
})

test("Should enter parking lot", async function(){
    const serviceParkingLot = fabrica("parkingLot") as ParkingLotService;
    const serviceParkedCar = fabrica("parkedCar") as ParkedCarService;

    const parkingLotBeforeEnter = await serviceParkingLot.getParkingLot("shopping", new Date("2021-10-11T10:00:00"));
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await serviceParkedCar.enterParkedCar("shopping", "MMM-0001", new Date("2021-10-11T10:00:00"));

    const parkingLotAfterEnter = await serviceParkingLot.getParkingLot("shopping", new Date("2021-10-11T10:00:00"));
    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
})

test.skip("Should be closed", async function(){
    const serviceParkingLot = fabrica("parkingLot") as ParkingLotService;
    const serviceParkedCar = fabrica("parkedCar") as ParkedCarService;

    const parkingLotBeforeEnter = await serviceParkingLot.getParkingLot("shopping", new Date("2021-10-11T23:00:00"));
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await serviceParkedCar.enterParkedCar("shopping", "MMM-0001", new Date("2021-10-11T23:00:00"));
})

test.skip("Should be full", async function(){
    const serviceParkingLot = fabrica("parkingLot") as ParkingLotService;
    const serviceParkedCar = fabrica("parkedCar") as ParkedCarService;

    const parkingLotBeforeEnter = await serviceParkingLot.getParkingLot("shopping");
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await serviceParkedCar.enterParkedCar("shopping", "MMM-0001", new Date("2021-10-11T10:00:00"));
    await serviceParkedCar.enterParkedCar("shopping", "MMM-0002", new Date("2021-10-11T10:00:00"));
    await serviceParkedCar.enterParkedCar("shopping", "MMM-0003", new Date("2021-10-11T10:00:00"));
    await serviceParkedCar.enterParkedCar("shopping", "MMM-0004", new Date("2021-10-11T10:00:00"));
    await serviceParkedCar.enterParkedCar("shopping", "MMM-0005", new Date("2021-10-11T10:00:00"));
    await serviceParkedCar.enterParkedCar("shopping", "MMM-0006", new Date("2021-10-11T10:00:00"));
})