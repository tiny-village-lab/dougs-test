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
    public static validateMovements(
        movements: Array<Movement>,
        checkpoints: Array<Balance>
    ): void {
        // The reasons to return
        let errorReasons: Array<Reason> = [];

        if (movements.length == 0) {
            return;
        }

        let sortedMovements: Array<Movement> = MovementService.sortMovementsByDate(movements); 
        let sortedCheckpoints: Array<Balance> = MovementService.sortBalancesByDate(checkpoints);

        // The checkpoint to start with is post the date of the first movement to verify
        if (sortedCheckpoints.at(0)!.date >= sortedMovements.at(0)!.date) {
            errorReasons.push(Reason.balanceStartInvalid());
        }

        // The last checkpoint is prior to the last movement date. 
        if (sortedCheckpoints.at(-1)!.date < sortedMovements.at(-1)!.date) {
            errorReasons.push(Reason.balanceEndInvalid());
        }

        // The list of movements contains duplicated ids, it is worth checking it
        if (MovementService.containsDuplicateIds(movements)) {
            errorReasons.push(Reason.movementIdDuplicate());
        }

        // Finally, test if there is any reason to throw an error
        if (errorReasons.length) {
            const error = new MovementValidationError(errorReasons);

            throw error;
        }

        // At this point, given data has been validated, 
        // now we can check data integrity

        for (let i=0; i<sortedCheckpoints.length-1; i++) {
            const initialBalance: Balance = sortedCheckpoints.at(i)!;
            const expectedBalance: Balance = sortedCheckpoints.at(i+1)!;

            // We take the movements that are in the date range
            const movementsInPeriod: Array<Movement> = sortedMovements.filter(movement => 
                movement.date >= initialBalance.date && movement.date <= expectedBalance.date
            );

            // We verify a period, and put aside a reason if something goes wrong
            if (MovementService.verifyOnePeriod(
                movementsInPeriod,
                initialBalance,
                expectedBalance
            ) === false) {
                const reason: Reason = Reason.balanceIsNotMatching();
                reason.movements = movementsInPeriod;
                reason.checkpoints = [initialBalance, expectedBalance];

                errorReasons.push(Reason.balanceIsNotMatching());
            }
        }

        // If some verifications gone wrong, we throw an error
        if (errorReasons.length) {
            const error = new MovementValidationError(errorReasons);
            throw error;
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

    /**
     * Return true if the list of given movements contain records
     * that have the same id
     */
    private static containsDuplicateIds(movements: Array<Movement>): boolean {
        let uniqueIds: Array<number> = [];

        movements.forEach(movement => {
            const existsAlready: boolean = uniqueIds.includes(movement.id);

            if (! existsAlready) {
                uniqueIds.push(movement.id);
            }
        });

        return uniqueIds.length !== movements.length;
    }

    private static verifyOnePeriod(
        movements: Array<Movement>,
        initialBalance: Balance,
        expectedBalance: Balance
    ): boolean {
        let balance: number = initialBalance.balance;

        movements.forEach((movement: Movement) => {
            balance += movement.amount;
        });

        if (balance === expectedBalance.balance) {
            return true;
        }

        return false;
    }

}
