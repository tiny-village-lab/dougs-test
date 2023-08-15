/**
 * Act as checkpoints for our app. They are considered as our
 * source of truth.
 */
export class Balance
{

    constructor(

        /**
         * Date of the balance
         */
        public date: Date,

        /**
         * Amount of the balance
         */
        public balance: number
    ) {}
}
