import { MovementService } from "../../src/services/movement.service";
import { Movement } from "../../src/models/movement.model";
import { Balance } from "../../src/models/balance.model";

service: MovementService;

describe("Testing MovementService", () => {

    /**
     * This tests fails because we would need to also have the balance
     * from 2023-06-30, otherwise we can's know what was the account balance
     * at the start of the month in july
     */
    test("throws an exception if no valid balance to start is received", () => {
        let movements: Array<Movement> = [
           new Movement(1, new Date(2023, 7, 3), "received transfer", 200.00), 
           new Movement(2, new Date(2023, 8, 22), "paid bill", -200.00)
        ];

        let balances: Array<Balance> = [
            new Balance(new Date(2023, 7, 31), 250.00),
            new Balance(new Date(2023, 8, 31), 200.00)
        ];

        expect(() => {
            MovementService.validateMovements(movements, balances);
        }).toThrow('balance-start-invalid');
    });
});
