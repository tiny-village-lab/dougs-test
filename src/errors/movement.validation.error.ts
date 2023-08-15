import { Reason } from "models/reason.model";
import { Movement } from "models/movement.model";
import { Balance } from "models/balance.model";

/**
 * An error class for movements validation
 */
export class MovementValidationError extends Error
{

    movements?: Array<Movement>;
    checkpoints?: Array<Balance>;

    constructor(
        public reasons: Array<Reason>
    ) {
        let message = "";

        reasons.forEach((reason: Reason) => {
            message = `[${reason.name}] : ${reason.text}; ${message}`;  
        });

        super(message); 

        Object.setPrototypeOf(this, MovementValidationError.prototype);
    }
}
