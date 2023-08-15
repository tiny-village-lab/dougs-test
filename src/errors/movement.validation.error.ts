import { Reason } from "models/reason.model";

/**
 * An error class for movements validation
 */
export class MovementValidationError extends Error
{

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
