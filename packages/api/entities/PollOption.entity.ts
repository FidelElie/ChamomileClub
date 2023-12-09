import { z } from "zod";

import { BaseEntity } from "./Base.entity";

export const PollOptionEntity = BaseEntity.merge(
  z.object({
    name: z.string(),
    description: z.string().nullish(),
    poll: z.object({ id: z.string() }),
    votes: z.record(z.string(), z.string()),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().nullish(),
  }),
);

export type PollOptionEntity = z.infer<typeof PollOptionEntity>;
