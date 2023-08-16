import request from "supertest";

import app from "../src/app";

describe("App test", () => {
    test("it should answer with a status 200 because data is exploitable", async () => {
        const movements = [
            {'id': 1, 'date': "2023-07-02", 'wording': "Received transfer", 'amount': 220.00},
            {'id': 2, 'date': "2023-07-05", 'wording': "Received transfer", 'amount': 100.00}
        ];

        const checkpoints = [
            {'date': '2023-06-30', 'balance': 100.00},
            {'date': '2023-07-31', 'balance': 420.00}
        ];

        const res = await request(app)
            .post("/movements/validation")
            .send({
                 'movements': movements,
                 'balances': checkpoints 
            })
            .expect(200);
    });

    test("it should answer with a status 500 because data is not exploitable", async () => {
        const movements = [
            {'id': 1, 'date': "2023-07-02", 'wording': "Received transfer", 'amount': 220.00},
            {'id': 2, 'date': "2023-07-05", 'wording': "Received transfer", 'amount': 100.00}
        ];

        const checkpoints = [
            {'date': '2023-07-30', 'balance': 100.00},
            {'date': '2023-07-31', 'balance': 420.00}
        ];

        const res = await request(app)
            .post("/movements/validation")
            .send({
                 'movements': movements,
                 'balances': checkpoints 
            })
            .expect(500);

        expect(JSON.stringify(res.body)).toContain('balance-start-invalid');
    });
});
