import { z, ZodType } from "zod";

export type InferDTOs<T extends { [key: string]: ZodType }> = {
	[Property in keyof T]: z.infer<T[Property]>
}
