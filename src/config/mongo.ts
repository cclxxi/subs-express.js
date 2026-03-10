import mongoose from "mongoose";

export async function connectMongo() {
    const uri = process.env.MONGO_URL;
    if (!uri) {
        throw new Error("Mongo URL not defined");
    }
    await mongoose.connect(uri);
    console.log("Mongo connected");
}