import { z } from "zod";

import {
  EventEntity,
  EventStatusEnum,
  UserCreationFieldsEntity,
  UserEntity,
} from "../entities";

import { PaginationQuery } from "../library";

export const FetchEventsInterfaces = {
  query: PaginationQuery.merge(
    z.object({
      start: z.coerce
        .date()
        .transform((date) => date.toISOString())
        .optional(),
      end: z.coerce
        .date()
        .transform((date) => date.toISOString())
        .optional(),
      userId: z.string().optional(),
      status: EventStatusEnum.optional(),
    }),
  ).default({}),
  response: z.object({
    items: z.array(
      EventEntity.merge(z.object({ members: z.array(UserEntity) })),
    ),
  }),
};

export const CreateEventsInterfaces = {
  body: z.object({
    entries: z.array(
      z.object({
        name: z.string(),
        members: z.array(UserEntity),
        invites: z.array(UserCreationFieldsEntity),
      }),
    ),
  }),
  response: z.object({
    items: z.array(EventEntity),
  }),
};

export const EditEventInterfaces = {
  params: z.object({
    eventId: z.string(),
  }),
  body: z.object({
    name: z.string().optional(),
    status: EventStatusEnum.optional(),
  }),
  response: z.object({ item: EventEntity }),
};
