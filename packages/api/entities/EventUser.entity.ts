import { z } from "zod";

import { BaseEntity } from "./Base.entity";

export const EventUserEntity = BaseEntity.merge(
  z.object({
    user: z.object({ id: z.string() }),
    event: z.object({ id: z.string() }),
    createdAt: z.coerce.date(),
  }),
);

export type EventUserEntity = z.infer<typeof EventUserEntity>;
