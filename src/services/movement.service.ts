import { Movement } from "models/movement.model";
import { Balance } from "models/balance.model";
import { Reason } from "models/reason.model";
import { MovementValidationError } from "errors/movement.validation.error";

/**
 * A service class that helps to deal with bank movements
 */
export class MovementService
{

    /**
     * Throw an error if we detect an anomaly in the movements
     */
    public static validateMovements(movements: Array<Movement>, checkpoints: Array<Balance>): void
    {
        if (movements.length == 0) {
            return;
        }

        let sortedMovements: Array<Movement> = MovementService.sortMovementsByDate(movements); 
        let sortedCheckpoints: Array<Balance> = MovementService.sortBalancesByDate(checkpoints);

        if (sortedCheckpoints.at(0)!.date >= sortedMovements.at(0)!.date) {
           throw new MovementValidationError([Reason.balanceStartInvalid()]);
        }
    }

    /**
     * Returns an array of movements sorted by date asc
     */
    private static sortMovementsByDate(movements: Array<Movement>): Array<Movement> {
        // I used the slice() method here to not sort the original array
        return movements.slice().sort(
            (movementA, movementB) => movementA.date.getTime() - movementB.date.getTime()
        );
    }

    /**
     * Returns an array of balances sorted by date asc
     */
    private static sortBalancesByDate(balances: Array<Balance>): Array<Balance> {
        // I used the slice() method here to not sort the original array
        return balances.slice().sort(
            (balanceA, balanceB) => balanceA.date.getTime() - balanceB.date.getTime()
        );
    }
}