import mongoose from "mongoose";

const mongoRailwayUrl = "${{ MongoDB.MONGO_URL }}"

export async function connectMongo() {
    await mongoose.connect(mongoRailwayUrl);
    console.log("Mongo connected");
}