import type { NextApiResponse } from "next";

import {
  InferDTOs,
  KeyEntity,
  SessionEntity,
  StartAuthProcessInterfaces,
  UpdateCurrentUserInterfaces,
  UserEntity,
  ValidateLoginCodeInterfaces,
} from "@thechamomileclub/api";

import { dependencyMap } from "@/library/configs";
import {
  ApiRequest,
  ApiRequestWithAuth,
  badRequestResponse,
  createdResponse,
  notFoundResponse,
  unauthorisedResponse,
  unprocessableEntityResponse,
} from "@/library/server";
import { AuthService } from "@/services";

const AuthControllerService = (serviceConfig: AuthControllerServiceConfig) => {
  const { xataClient: { db } } = serviceConfig;

  return {
    /** */
    getCurrentUser: (
      req: ApiRequestWithAuth,
      res: NextApiResponse,
    ) => {
      res.status(200).json({
        session: req.auth?.session || null,
        user: req.auth?.user || null,
      });
    },
    /** */
    startAuthProcess: async (
      req: ApiRequest<InferDTOs<typeof StartAuthProcessInterfaces>>,
      res: NextApiResponse,
    ) => {
      const { email } = req.body;

      const userWithEmail = await db.users.filter({ email }).getFirst();

      if (!userWithEmail) {
        return notFoundResponse(res, "User not found");
      }

      const userResult = UserEntity.safeParse(userWithEmail);

      if (!userResult.success) {
        return unprocessableEntityResponse(res, "User invalid");
      }

      const existingAccessKeys = await db.keys
        .filter({ user: userWithEmail.id })
        .getAll();

      await db.keys.delete(existingAccessKeys.map((key) => key.id));

      const accessKey = await db.keys.create(
        {
          code: AuthService.generateRandomString(6),
          user: { id: userResult.data.id },
          token: AuthService.signToken({ id: userResult.data.id, email: userResult.data.email }),
        } satisfies Pick<KeyEntity, "code" | "user" | "token">,
      );

      const payload = {
        keyId: accessKey.id,
        forename: userResult.data.forename,
      } satisfies InferDTOs<typeof StartAuthProcessInterfaces>["response"];

      return createdResponse(res, payload);
    },
    /** */
    validateLoginCode: async (
      req: ApiRequest<InferDTOs<typeof ValidateLoginCodeInterfaces>>,
      res: NextApiResponse,
    ) => {
      const { keyId, code } = req.body;

      const correspondingKey = await db.keys.read(keyId);

      if (!correspondingKey) {
        return badRequestResponse(res, "Key not found");
      }

      const { token, code: keyCode } = KeyEntity.parse(correspondingKey);

      if (!token) { return unauthorisedResponse(res); }

      const { decoded, error } = AuthService.verifyToken<Pick<UserEntity, "id" | "email">>(
        token,
      );

      if (error || keyCode !== code || !decoded) {
        return unauthorisedResponse(res, "Invalid code");
      }

      const newSession = await db.sessions.create(
        {
          user: { id: decoded.id },
        } satisfies Pick<SessionEntity, "user">,
      );

      const sessionToken = AuthService.signToken({ session: newSession.id });

      await db.keys.delete(keyId);

      const payload = {
        token: sessionToken,
      } satisfies InferDTOs<typeof ValidateLoginCodeInterfaces>["response"];

      return createdResponse(res, payload);
    },
    /** */
    updateCurrentUser: async (
      req: ApiRequestWithAuth<InferDTOs<typeof UpdateCurrentUserInterfaces>>,
      res: NextApiResponse,
    ) => {
      if (!req.auth) {
        return unauthorisedResponse(res, "No user auth");
      }

      await db.users.update(req.auth.user.id, req.body);

      return res.status(204).end();
    },
    /** */
    logoutUser: async (
      req: ApiRequestWithAuth,
      res: NextApiResponse,
    ) => {
      if (!req.auth) {
        return badRequestResponse(res, "No session found");
      }

      await db.sessions.update(req.auth.session, { deletedAt: new Date() });

      return res.status(204).end();
    },
  };
};

export const createAuthControllerService = (serviceConfig: AuthControllerServiceConfig) => {
  return AuthControllerService(serviceConfig);
};

type AuthControllerServiceConfig = Pick<typeof dependencyMap, "xataClient">;
