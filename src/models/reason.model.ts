/**
 * Used when an error is throw, to give a functional focus feedback
 */
export class Reason
{
    
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
            "We couldn't find a balance that could help to verify the last movements"
        );
    }
}
