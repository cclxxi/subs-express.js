import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 3000,
    JWT_SECRET: String(process.env.JWT_SECRET),
    MONGODB_URL: String(process.env.MONGODB_URL),
    PRODUCTION_DOMAIN: String(process.env.PRODUCTION_DOMAIN),
}