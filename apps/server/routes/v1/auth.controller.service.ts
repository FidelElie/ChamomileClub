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
  ApiRequestWithAuth,
  BadRequestException,
  Context,
  DefaultEntities,
  NotFoundException,
  UnauthorisedException,
  UnprocessableEntityException,
  useAuth,
  useEnsureAuth,
} from "@/library/server";

const AuthControllerService = (serviceConfig: AuthControllerServiceConfig) => {
  const { xataClient: { db }, AuthService } = serviceConfig;

  return {
    /** */
    getCurrentUser: (context: Context<DefaultEntities, ApiRequestWithAuth>) => {
      const auth = useAuth(context);

      return { session: auth?.session || null, user: auth?.user || null };
    },
    /** */
    startAuthProcess: async (context: Context<InferDTOs<typeof StartAuthProcessInterfaces>>) => {
      const { email } = context.body;

      const userWithEmail = await db.users.filter({ email }).getFirst();

      if (!userWithEmail) { throw new NotFoundException("User not found"); }

      const userResult = UserEntity.safeParse(userWithEmail);

      if (!userResult.success) { throw new UnprocessableEntityException("User invalid"); }

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

      return StartAuthProcessInterfaces.response.parse({
        keyId: accessKey.id,
        forename: userResult.data.forename,
      });
    },
    /** */
    validateLoginCode: async (context: Context<InferDTOs<typeof ValidateLoginCodeInterfaces>>) => {
      const { keyId, code } = context.body;

      const correspondingKey = await db.keys.read(keyId);

      if (!correspondingKey) { throw new BadRequestException("Key not found"); }

      const { token, code: keyCode } = KeyEntity.parse(correspondingKey);

      if (!token) { throw new UnauthorisedException("Key token not found"); }

      const { decoded, error } = AuthService.verifyToken<Pick<UserEntity, "id" | "email">>(
        token,
      );

      if (error || keyCode !== code || !decoded) {
        throw new UnauthorisedException("Invalid code");
      }

      const newSession = await db.sessions.create(
        {
          user: { id: decoded.id },
        } satisfies Pick<SessionEntity, "user">,
      );

      const sessionToken = AuthService.signToken({ session: newSession.id });

      await db.keys.delete(keyId);

      return ValidateLoginCodeInterfaces.response.parse({ token: sessionToken });
    },
    /** */
    updateCurrentUser: async (context: Context<UpdateCurrentUserInterfaces, ApiRequestWithAuth>) => {
      const { body } = context;
      const auth = useEnsureAuth(context);

      await db.users.update(auth.user.id, body);
    },
    /** */
    logoutUser: async (context: Context<DefaultEntities, ApiRequestWithAuth>) => {
      const auth = useEnsureAuth(context);

      await db.sessions.update(auth.session, { deletedAt: new Date() });
    },
  };
};

export const createAuthControllerService = (serviceConfig: AuthControllerServiceConfig) => {
  return AuthControllerService(serviceConfig);
};

type AuthControllerServiceConfig = Pick<typeof dependencyMap, "xataClient" | "AuthService">;
