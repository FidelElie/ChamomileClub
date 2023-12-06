import { z } from "zod";

export const PaginationQuery = z.object({
	page: z.number().optional(),
	entries: z.number().optional()
});
