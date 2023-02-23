import { z } from "zod";
import { UserSchema, type UserSchemaType } from "../schemas";

/**
 *
 */
export const AuthenticateBodySchema = z.object({
	id: z.string(),
	code: z.string(),
	user: UserSchema.pick({
		forename: true,
		surname: true,
		email: true,
		nickname: true
	}).optional()
});

export type AuthenticateBody = z.infer<typeof AuthenticateBodySchema>;

export const AuthenticateResponseSchema = z.object({ token: z.string() });

export type AuthenticateResponse = z.infer<typeof AuthenticateResponseSchema>;

/**
 *
 */
export const StartLoginBodySchema = z.object({ email: z.string() });

export type StartLoginBody = z.infer<typeof StartLoginBodySchema>;

export const StartLoginResponseSchema = UserSchema;

export type StartLoginResponse = UserSchemaType;

/**
 *
 */
export const VerifyLoginQuerySchema = z.object({ id: z.string(), code: z.string() });

export type VerifyLoginQuery = z.infer<typeof VerifyLoginQuerySchema>;

export const VerifyLoginResponseSchema = z.object({
	id: z.string(),
	state: z.enum(["login", "registration"]),
	user: UserSchema.pick({
		forename: true,
		surname: true,
		email: true,
		nickname: true,
		description: true,
		position: true
	})
});

export type VerifyLoginResponse = z.infer<typeof VerifyLoginResponseSchema>;
