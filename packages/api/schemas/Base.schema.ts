import { coerce, nullable, object, optional, string } from "valibot";

export const BaseSchema = object({
	id: string(),
	deletedAt: optional(
		nullable(coerce(string(), (input) => (new Date(input as any)).toISOString()))
	),
	xata: object({
		createdAt: coerce(string(), (input) => (new Date(input as any)).toISOString()),
		updatedAt: optional(
			nullable(coerce(string(), (input) => (new Date(input as any)).toISOString()))
		),
		version: string()
	})
});
