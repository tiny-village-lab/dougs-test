/**
 * A movement of money in the bank account
 */
export class Movement
{
    
    constructor(
    
        /**
         * unique id
         */
        public id: number,

        /**
         * date when the movement happened
         */
        public date: Date,

        /**
         * label to describe the movement
         */
        public wording: string,

        /**
         * the amount involved in the movement
         */
        public amount: number
    ){}
}
