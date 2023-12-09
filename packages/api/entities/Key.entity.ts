import { z } from "zod";

import { BaseEntity } from "./Base.entity";

export const KeyEntity = BaseEntity.merge(
  z.object({
    id: z.string(),
    token: z.string(),
    code: z.string(),
    user: z.object({ id: z.string() }),
  }),
);

export type KeyEntity = z.infer<typeof KeyEntity>;
