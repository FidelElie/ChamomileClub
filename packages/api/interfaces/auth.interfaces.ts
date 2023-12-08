import { z } from "zod";

import { UserEntity } from "../entities";
import {
	InferDTOs,
	BadRequestResponseDTO,
	NotFoundResponseDTO,
	UnauthorisedResponseDTO,
	UnprocessableEntityResponseDTO
} from "../library";

export const GetCurrentUserInterfaces = {
	response: z.union([
		z.object({ session: z.string(), user: UserEntity }),
		z.object({ session: z.null(), user: z.null() })
	])
}

export type GetCurrentUserInterfaces = InferDTOs<typeof GetCurrentUserInterfaces>;

export const StartAuthProcessInterfaces = {
	body: z.object({ email: z.string().email() }),
	response: z.object({ keyId: z.string(), forename: z.string() }),
	404: NotFoundResponseDTO("User not found"),
	422: UnprocessableEntityResponseDTO("User invalid")
}

export type StartAuthProcessInterfaces = InferDTOs<typeof StartAuthProcessInterfaces>;

export const ValidateLoginCodeInterfaces = {
	body: z.object({ keyId: z.string(), code: z.string() }),
	response: z.object({ token: z.string() }),
	400: BadRequestResponseDTO("Key not found"),
	401: UnauthorisedResponseDTO("Invalid code")
}

export type ValidateLoginCodeInterfaces = InferDTOs<typeof ValidateLoginCodeInterfaces>;

export const UpdateCurrentUserInterfaces = {
	body: UserEntity.pick({ nickname: true, active: true }).partial(),
	response: z.literal("")
}

export type UpdateCurrentUserInterfaces = InferDTOs<typeof UpdateCurrentUserInterfaces>;

export const LogoutUserInterfaces = {
	response: z.literal("")
}

export type LogoutUserInterfaces = InferDTOs<typeof LogoutUserInterfaces>;
