import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const env = {
    PORT: Number(process.env.PORT) || 3000,
    JWT_SECRET: requireEnv("JWT_SECRET"),
    // Railway may expose the Mongo URL as MONGO_URL, keep a fallback.
    MONGODB_URI: process.env.MONGODB_URI?.trim() || process.env.MONGO_URL?.trim() || "",
    PRODUCTION_DOMAIN: process.env.PRODUCTION_DOMAIN?.trim() || "",
};

if (!env.MONGODB_URI) {
    throw new Error("Missing required environment variable: MONGODB_URI or MONGO_URL");
}