import { Movement } from "models/movement.model";
import { Balance } from "models/balance.model";

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
        
    }
}
