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

    static balanceStartInvalid(): Reason {
        return new Reason(
            'balance-start-invalid',
            "We couldn't find a balance to start the verification on the given period. A balance with a prior date to the first movement is necessary."
        );
    }
}
