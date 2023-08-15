import { Movement } from "models/movement.model";
import { Balance } from "models/balance.model";

/**
 * Used when an error is throw, to give a functional focus feedback
 */
export class Reason
{

    movements?: Array<Movement>;
    checkpoints?: Array<Balance>;
    
    constructor(

        /**
         * A textual id that matches documentation
         */
        public name: string,

        /**
         * Detailed description that focuses on functional
         */
        public text: string
    ) {};

    /**
     * When there is no balance to determine the start point of the account
     */ 
    static balanceStartInvalid(): Reason {
        return new Reason(
            'balance-start-invalid',
            "We couldn't find a balance to start the verification on the given period. A balance with a prior date to the first movement is necessary."
        );
    }

    /**
     * When there is no balance to verify the last movements
     */ 
    static balanceEndInvalid(): Reason {
        return new Reason(
            'balance-end-invalid',
            "We couldn't find a target balance to make the verification on the given period. A balance at the date of the last movement is necessary."
        );
    }

    /**
     * When the given list of movements contains
     * duplicate records (records that have the same id)
     */
    static movementIdDuplicate(): Reason {
        return new Reason(
            'movement-id-duplicate', 
            "We couldn't find a target balance to make the verification on the given period. A balance at the date of the last movement is necessary." 
        );
    }

    /*
     * When we don't find the expected balance after applying movements to 
     * the initial balance
     */
    static balanceIsNotMatching(): Reason {
        return new Reason(
            'balance-not-matching',
            "Something went wrong while trying to find the expected balance."
        );
    }

}
