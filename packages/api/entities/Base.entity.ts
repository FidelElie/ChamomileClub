import { z } from "zod";

export const BaseEntity = z.object({ id: z.string() });
