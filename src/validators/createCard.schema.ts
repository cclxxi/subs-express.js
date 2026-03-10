import { z } from "zod";

export const CreateCardSchema = z.object({
    userId: z.string(),
    name: z.string().min(2).max(255),
    last: z.number().min(1000).max(9999),
});