import { Reason } from "models/reason.model";

/**
 * An error class for movements validation
 */
export class MovementValidationError extends Error
{

    constructor(
        public message: string,
        public reasons: Array<Reason>
    ) {
        super(message); 

        Object.setPrototypeOf(this, MovementValidationError.prototype);
    }
}
