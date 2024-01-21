import { z, ZodType } from "zod";

export type InferDTOs<T extends { [key: string]: ZodType; }> = {
  [Property in keyof T]: z.infer<T[Property]>;
};

export type RequestDTOs<T extends { [key: string]: ZodType; }> = Omit<
  InferDTOs<T>,
  "response"
>;

export type ResponseDTOs<T extends { [key: string]: ZodType; }> = Pick<
  InferDTOs<T>,
  "response"
>;
