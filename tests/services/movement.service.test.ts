import { MovementService } from "../../src/services/movement.service";
import { Movement } from "../../src/models/movement.model";
import { Balance } from "../../src/models/balance.model";

service: MovementService;

describe("Testing MovementService", () => {

    /**
     * Error because we would need to also have the balance
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
        }).toThrow('balance-start-invalid')
    });

    /**
     * Error because we would need to also have a balance
     * from 2023-08-31, otherwise we can't verify the last movements that happened in august
     */
    test("throws an exception if no valid balance to end is received", () => {
        let movements: Array<Movement> = [
           new Movement(1, new Date(2023, 7, 3), "received transfer", 200.00), 
           new Movement(2, new Date(2023, 7, 14), "received transfer", 100.00), 
           new Movement(3, new Date(2023, 8, 22), "paid bill", -200.00)
        ];

        let balances: Array<Balance> = [
            new Balance(new Date(2023, 6, 30), 250.00),
            new Balance(new Date(2023, 7, 31), 250.00),
        ];

        expect(() => {
            MovementService.validateMovements(movements, balances);
        }).toThrow('balance-end-invalid')
    });

    /**
     * Error because the list of given movements contains duplicate ids
     */
    test("throws an exception if list of given movements contains duplicate ids", () => {
        let movements: Array<Movement> = [
           new Movement(1, new Date(2023, 7, 3), "received transfer", 200.00), 
           new Movement(1, new Date(2023, 7, 14), "received transfer", 100.00), 
           new Movement(2, new Date(2023, 8, 22), "paid bill", -200.00)
        ];

        let balances: Array<Balance> = [
            new Balance(new Date(2023, 6, 30), 250.00),
            new Balance(new Date(2023, 7, 31), 250.00),
            new Balance(new Date(2023, 8, 31), 200.00)
        ];

        expect(() => {
            MovementService.validateMovements(movements, balances);
        }).toThrow('movement-id-duplicate')
    });

    /**
     * Error because the calculated balance doesn't match
     * the expected balance
     */
    test("throws an exception if balance is not matching", () => {
        let movements: Array<Movement> = [
           new Movement(1, new Date(2023, 7, 3), "received transfer", 200.00), 
           new Movement(2, new Date(2023, 7, 14), "received transfer", 100.00), 
           new Movement(3, new Date(2023, 8, 22), "paid bill", -200.00)
        ];

        let balances: Array<Balance> = [
            new Balance(new Date(2023, 6, 30), 250.00),
            new Balance(new Date(2023, 8, 31), 200.00)  // final is not correct, should be 350
        ];

        expect(() => {
            MovementService.validateMovements(movements, balances);
        }).toThrow('balance-not-matching')
    });

    /**
     * No error, verification is done
     */
    test("balances match, nothing happens, which means we're good", () => {
        let movements: Array<Movement> = [
           new Movement(1, new Date(2023, 7, 3), "received transfer", 200.00), 
           new Movement(2, new Date(2023, 7, 14), "received transfer", 100.00), 
           new Movement(3, new Date(2023, 8, 22), "paid bill", -200.00)
        ];

        let balances: Array<Balance> = [
            new Balance(new Date(2023, 6, 30), 250.00),
            new Balance(new Date(2023, 8, 31), 350.00)  // final is correct
        ];

        expect(() => {
            MovementService.validateMovements(movements, balances);
        }).not.toThrow('balance-not-matching')
    });

    /**
     * No error, verification is done
     */
    test("balances match on bigger ranges, nothing happens", () => {
        let movements: Array<Movement> = [
           new Movement(1, new Date(2023, 7, 3), "received transfer", 200.00), 
           new Movement(2, new Date(2023, 7, 14), "received transfer", 100.00), 
           new Movement(3, new Date(2023, 8, 22), "paid bill", -200.00),
           new Movement(4, new Date(2023, 8, 24), "paid bill", -100.00),
           new Movement(4, new Date(2023, 9, 4), "transfer", 300.00),
        ];

        let balances: Array<Balance> = [
            new Balance(new Date(2023, 6, 30), 250.00),
            new Balance(new Date(2023, 7, 31), 550.00),
            new Balance(new Date(2023, 8, 31), 250.00),
            new Balance(new Date(2023, 9, 30), 550.00),
        ];

        expect(() => {
            MovementService.validateMovements(movements, balances);
        }).not.toThrow('balance-not-matching')
    });
});
