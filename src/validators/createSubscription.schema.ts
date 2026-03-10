import { z } from "zod";
import { SubscriptionPeriodicity } from "../types/subscriptionPeriodicity";

export const CreateSubscriptionSchema = z.object({
    service: z.string().min(1).max(255),
    price: z.number().min(0),
    currency: z.string().min(1).max(10),
    periodicity: z.enum(SubscriptionPeriodicity),
    startDate: z.coerce.date(),
    cardId: z.string()
});