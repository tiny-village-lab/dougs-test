import app from "./app";

const PORT: Number = 9000;

app.listen(PORT, (): void => console.log(`running on port ${PORT}`));
