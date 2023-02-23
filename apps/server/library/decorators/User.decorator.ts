import { createParamDecorator } from "next-api-decorators";
import type { ApiRequestWithUser } from "../types/api.types";

export const User = createParamDecorator((req) => {
	const request = req as ApiRequestWithUser;

	return request.user;
});
