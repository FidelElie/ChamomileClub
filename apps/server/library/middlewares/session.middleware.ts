import type { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { SessionEntity, UserEntity, z } from "@thechamomileclub/api";
import { XataClient } from "@thechamomileclub/database";

import type { createAuthService } from "@/services";
import type { ApiRequestWithAuth } from "../server";

export const createExposeSessionMiddleware = (config: ExposeSessionMiddlewareConfig) => {
  const { xataClient: { db }, AuthService } = config;

  return async (
    req: ApiRequestWithAuth,
    _: NextApiResponse,
    next: NextHandler,
  ) => {
    const { authorization } = req.headers;

    if (!authorization) { return next(); }

    const token = authorization.replace("Bearer ", "");

    if (!token) { return next(); }

    const { decoded, error } = AuthService.verifyToken<{ session: string; }>(token);

    if (!decoded || error) {
      return next();
    }

    const sessionWithUserSchema = SessionEntity.merge(
      z.object({
        user: UserEntity,
      }),
    );

    const databaseSession = await db.sessions
      .filter({ id: decoded.session, $notExists: "deletedAt" })
      .select(["*", "user.*"])
      .getFirst();

    const sessionResult = sessionWithUserSchema.safeParse(databaseSession);

    if (!sessionResult.success) {
      console.log(sessionResult.error);
      return next();
    }

    req.auth = { session: sessionResult.data.id, user: sessionResult.data.user };

    next();
  };
};

type ExposeSessionMiddlewareConfig = {
  xataClient: XataClient;
  AuthService: ReturnType<typeof createAuthService>;
};
