import { z } from "zod";

import { BaseEntity } from "./Base.entity";

export const SessionEntity = BaseEntity.merge(
	z.object({
		user: z.object({ id: z.string() }),
		deletedAt: z.coerce.date().nullish()
	})
)

export type SessionEntity = z.infer<typeof SessionEntity>;
