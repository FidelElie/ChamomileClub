import { z } from "zod";

export const BadRequestResponseDTO = (message: string) =>
  z.object({
    status: z.literal(400),
    message: z.literal(message),
    data: z.object({ reason: z.literal("Bad Request") }),
  });

export const UnauthorisedResponseDTO = (message: string) =>
  z.object({
    status: z.literal(401),
    message: z.literal(message),
    data: z.object({ reason: z.literal("Unauthorised") }),
  });

export const PaymentRequiredResponseDTO = (message: string) =>
  z.object({
    status: z.literal(402),
    message: z.literal(message),
    data: z.object({ reason: z.literal("Payment Required") }),
  });

export const ForbiddenResponseDTO = (message: string) =>
  z.object({
    status: z.literal(403),
    message: z.literal(message),
    data: z.object({ reason: z.literal("Forbidden") }),
  });

export const NotFoundResponseDTO = (message: string) =>
  z.object({
    status: z.literal(404),
    message: z.literal(message),
    data: z.object({ reason: z.literal("Not Found") }),
  });

export const ConflictResponseDTO = (message: string) =>
  z.object({
    status: z.literal(409),
    message: z.literal(message),
    data: z.object({ reason: z.literal("Conflict") }),
  });

export const PayloadTooLargeResponseDTO = (message: string) =>
  z.object({
    status: z.literal(413),
    message: z.literal(message),
    data: z.object({ reason: z.literal("Payload Too Large") }),
  });

export const UnsupportedMediaTypeResponseDTO = (message: string) =>
  z.object({
    status: z.literal(415),
    message: z.literal(message),
    data: z.object({ reason: z.literal("Unsupported Media Type") }),
  });

export const ImATeapotResponseDTO = (message: string) =>
  z.object({
    status: z.literal(418),
    message: z.literal(message),
    data: z.object({ reason: z.literal("I'm a Teapot") }),
  });

export const UnprocessableEntityResponseDTO = (message: string) =>
  z.object({
    status: z.literal(422),
    message: z.literal(message),
    data: z.object({ reason: z.literal("I'm a Teapot") }),
  });

export const InternalServerErrorResponseDTO = (message: string) =>
  z.object({
    status: z.literal(500),
    message: z.literal(message),
    data: z.object({ reason: z.literal("Internal Server Error") }),
  });

export const NotImplementedDTO = (message: string) =>
  z.object({
    status: z.literal(501),
    message: z.literal(message),
    data: z.object({ reason: z.literal("Not Implemented") }),
  });

export const ServiceUnavailableResponseDTO = (message: string) =>
  z.object({
    status: z.literal(503),
    message: z.literal(message),
    data: z.object({ reason: z.literal("Service Unavailable") }),
  });
