import mongoose from "mongoose";
import { env } from "./env";

function assertMongoUri(uri: string): void {
    if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
        throw new Error(
            "Invalid Mongo URI. It must start with mongodb:// or mongodb+srv://"
        );
    }
}

export async function connectMongo() {
    assertMongoUri(env.MONGODB_URI);
    await mongoose.connect(env.MONGODB_URI);
    console.log("Mongo connected");
}