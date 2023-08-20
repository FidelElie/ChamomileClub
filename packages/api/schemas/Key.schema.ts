import { Output, merge, object, string } from "valibot";

import { BaseSchema } from "./Base.schema";

export const KeySchema = merge([
	BaseSchema,
	object({
		token: string(),
		code: string(),
		user: object({ id: string() })
	})
]);

export type KeySchema = Output<typeof KeySchema>;
