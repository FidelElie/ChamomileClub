import {
	createParamDecorator,
	BadRequestException,
	UnprocessableEntityException
} from "next-api-decorators";
import type { ZodSchema } from "zod";

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
