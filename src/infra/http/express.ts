import Express from "express";
import ExpressAdapter from "../../adapter/ExpressAdapter";
import ParkedCarController from "../../core/controller/ParkedCarController";
import ParkingLotController from "../../core/controller/ParkingLotController";

var bodyParser = require('body-parser');

const app = new Express();

app.use(bodyParser.json());

app.get("/parkingLot/:code/:plate", ExpressAdapter.create(ParkingLotController.getParkingLot));

app.post("/parkingLot/", ExpressAdapter.create(ParkingLotController.enterParkingLot));

app.get("/parkedCar/:code/:plate", ExpressAdapter.create(ParkedCarController.getParkedCar));

app.post("/parkedCar/", ExpressAdapter.create(ParkedCarController.enterParkedCar));

const env = process.env.NODE_ENV;
console.log(`Nodejs is ${env}`);

app.listen(8080);