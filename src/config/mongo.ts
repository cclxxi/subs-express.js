import mongoose from "mongoose";
import { env } from "./env"

export async function connectMongo() {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Mongo connected");
}