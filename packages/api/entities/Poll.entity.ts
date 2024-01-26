import { z } from "zod";

import { BaseEntity } from "./Base.entity";

export const PollTypes = {
  EVENT_DATE: "EVENT_DATE",
} as const;

export const PollTypesEnum = z.enum([PollTypes.EVENT_DATE]);

export const PollEntity = BaseEntity.merge(
  z.object({
    name: z.string(),
    type: PollTypesEnum,
    event: z.object({ id: z.string() }).nullish(),
    createdBy: z.object({ id: z.string() }),
    expiresAt: z.coerce
      .date()
      .transform((date) => date.toISOString())
      .nullish(),
    votesPerUser: z.number().int().default(1),
    createdAt: z.coerce.date().transform((date) => date.toISOString()),
    updatedAt: z.coerce
      .date()
      .transform((date) => date.toISOString())
      .nullish(),
  }),
);

export type PollEntity = z.infer<typeof PollEntity>;

export const PollCreationEntity = PollEntity.pick({
  name: true,
  type: true,
  expiresAt: true,
  votesPerUser: true,
});

export type PollCreationEntity = z.infer<typeof PollCreationEntity>;
