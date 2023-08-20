import {
	email,
	object,
	string,
	optional,
	boolean,
	merge,
	withDefault,
	nullable,
	enumType,
	Output,
	array
} from "valibot";

import { BaseSchema } from "./Base.schema";

export const RolesEnum = enumType(["admin", "founder", "editor", "team", "member", "prospect"]);

export type RolesEnum = Output<typeof RolesEnum>;

export const UserSchema = merge([
	BaseSchema,
	object({
		email: string([email()]),
		forename: string(),
		surname: optional(nullable(string())),
		nickname: optional(nullable(string())),
		active: withDefault(boolean(), false),
		position: optional(nullable(string())),
		description: optional(nullable(string())),
		roles: array(RolesEnum)
	})
]);

export type UserSchema = Output<typeof UserSchema>;
