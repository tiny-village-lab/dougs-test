import express, { Application, Request, Response, NextFunction } from "express";
import { router as movementRoutes } from "./routes/movement.routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/movements", movementRoutes);

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
    res.json({ message: "Welcome" });
});

export default app;
