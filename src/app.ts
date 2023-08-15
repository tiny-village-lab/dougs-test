import express, { Application, Request, Response, NextFunction } from "express";
import { router as movementRoutes } from "./routes/movement.routes";

const app: Application = express();

app.use("/movements", movementRoutes);

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
    res.json({ message: "Allo! Catch-all route." });
});

export default app;
