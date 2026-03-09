import app from "./app"
import * as process from "node:process";

async function start() {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}

void start();