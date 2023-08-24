import { z, ZodType } from "zod";

export * from "./auth.interfaces";

export type InferDTOs<T extends { [key: string]: ZodType }> = {
	[Property in keyof T]: z.infer<T[Property]>
}
