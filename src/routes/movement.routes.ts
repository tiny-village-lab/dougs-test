import { Movement } from "../models/movement.model";
import { Balance } from "../models/balance.model";
import { MovementService } from "../services/movement.service";

import { Router, Request, Response } from "express";

const router = Router();

router.post("/validation", async (req: Request, res: Response) => {
    const movements: Array<Movement> = [];
    const balances: Array<Balance> = [];

    req.body.movements.forEach((movement: any) => {
        movements.push(
            new Movement(
                movement.id,
                new Date(movement.date),
                movement.wording,
                movement.amount
            )
        );
    });

    req.body.balances.forEach((balance: any) => {
        balances.push(
            new Balance(
                new Date(balance.date),
                balance.balance
            )
        );
    });

    try {
        MovementService.validateMovements(movements, balances);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }


});

export { router };
