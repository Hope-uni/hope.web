import { z } from "zod";

export const RoleSchema = z.object({
    name: z.string()
});