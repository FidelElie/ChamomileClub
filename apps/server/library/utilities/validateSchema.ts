import { UnprocessableEntityException } from "next-api-decorators";
import { z, ZodSchema, ZodError } from "zod";

export const validateSchema = <T extends ZodSchema>(input: any, schema: T) => {
	try {
		return schema.parse(input) as z.infer<T>;
	} catch(error: any) {
		throw new UnprocessableEntityException((error as ZodError).stack);
	}
}
