import { MovementService } from "../../src/services/movement.service";
import { Movement } from "../../src/models/movement.model";
import { Balance } from "../../src/models/balance.model";

service: MovementService;

describe("Testing MovementService", () => {

    test("throws an exception if no valid balance to start is received", () => {
        let movements: Array<Movement> = [
           new Movement(1, new Date(2023, 7, 3), "received transfer", 200.00), 
           new Movement(2, new Date(2023, 7, 3), "paid bill", -200.00)
        ];
    });
});
