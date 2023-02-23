import "reflect-metadata";
import {
	BadRequestException,
	createParamDecorator,
	UnprocessableEntityException
} from "next-api-decorators";
import type { ZodSchema } from "zod";

import type { ApiRequestWithUser } from "./types/api.types";

export const CONTROLLER_TOKEN = Symbol('instant:next:controllers');

/**
 * Registers a new controller for the server. Method routes still have to contain path.
 * @param baseUrl base url for the controller to act on.
 * @returns Controller class
 */
export function Controller(baseUrl: string = "/"): ClassDecorator {
	return (target: object): void => {
		Reflect.defineMetadata(CONTROLLER_TOKEN, baseUrl, target);
	}
}

export const ValidatedBody = <T extends ZodSchema>(schema: T): () => ParameterDecorator => {
	 return createParamDecorator<T>(req => {
		const { body } = req;

		if (!body) {
			throw new UnprocessableEntityException("No body was passed but required");
		}

		try {
			return schema.parse(body);
		} catch (error) {
			throw new BadRequestException("Invalid body passed to endpoint");
		}
	})
}

export const ValidatedQuery = <T extends ZodSchema>(schema: T): () => ParameterDecorator => {
	return createParamDecorator<T>(req => {
		const { query } = req;

		try {
			return schema.parse(query);
		} catch (error) {
			throw new BadRequestException("Invalid query passed to endpoint");
		}
	});
}

export const User = createParamDecorator((req) => {
	const request = req as ApiRequestWithUser;

	return request.user;
});
