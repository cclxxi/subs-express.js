import { z } from "zod";

export const CreateCardSchema = z.object({
    name: z.string().min(2).max(255),
    last4: z.number().min(1000).max(9999),
});