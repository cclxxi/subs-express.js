import mongoose from "mongoose";
import { env } from "./env"

export async function connectMongo() {
    await mongoose.connect(env.MONGODB_URL);
    console.log("Mongo connected");
}