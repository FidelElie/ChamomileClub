import { BadRequestException, createParamDecorator } from "next-api-decorators";
import type { ZodSchema } from "zod";

export const ValidatedQuery = <T extends ZodSchema>(schema: T): () => ParameterDecorator => {
	return createParamDecorator<T>(req => {
		const { query } = req;

		try {
			return schema.parse(query);
		} catch (error) {
			console.log(error);
			throw new BadRequestException("Invalid query passed to endpoint");
		}
	});
}
