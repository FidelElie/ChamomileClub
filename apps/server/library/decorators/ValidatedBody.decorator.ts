import {
	createParamDecorator,
	BadRequestException,
	UnprocessableEntityException
} from "next-api-decorators";
import { z, ZodSchema } from "zod";

export const ValidatedBody = (schema: ZodSchema = z.any()): () => ParameterDecorator => {
	return createParamDecorator(req => {
		const { body } = req;

		if (!body) {
			throw new UnprocessableEntityException("No body was passed but required");
		}

		try {
			return schema.parse(body);
		} catch (error) {
			console.log(error);
			throw new BadRequestException("Invalid body passed to endpoint");
		}
	})
}
