import app from "./app"
import { env } from "./config/env";
import { connectMongo } from "./config/mongo";

async function start() {
    await connectMongo();
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${env.PORT}`);
    })
}

void start();