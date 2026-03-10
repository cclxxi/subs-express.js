import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./config/swagger";
import userRoutes from './routes/user.routes';
import authRoutes from "./routes/auth.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import cardRoutes from "./routes/card.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["https://subs-reactjs.vercel.app"]
}))
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/docs.json", (_req, res) => {
    res.json(swaggerSpec);
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/subs", subscriptionRoutes);
app.use("/api/cards", cardRoutes);

export default app;