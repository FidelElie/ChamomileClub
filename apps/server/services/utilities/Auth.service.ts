import JWT, { type SignOptions, type VerifyOptions } from "jsonwebtoken";

export const AuthService = (serviceConfig: AuthServiceConfig) => {
  const { secret } = serviceConfig;

  return {
    signToken: (payload: string | object | Buffer, config?: SignOptions) => {
      return JWT.sign(payload, secret, config);
    },
    verifyToken: <T extends string | JWT.Jwt | JWT.JwtPayload>(
      token: string,
      config: VerifyOptions & {
        error?: Error;
        onSuccess?: (decoded: T) => void;
      } = {},
    ): { decoded: T; error: null; } | { decoded: null; error: unknown; } => {
      const { error: errorToThrow, onSuccess, ...jwtOptions } = config;

      try {
        const decodedToken = JWT.verify(token, secret, jwtOptions) as T;

        if (onSuccess) {
          onSuccess(decodedToken);
        }

        return { decoded: decodedToken, error: null };
      } catch (error: unknown) {
        if (errorToThrow) {
          throw errorToThrow;
        }

        return { decoded: null, error };
      }
    },
    generateRandomString: (length: number) => {
      if (typeof length !== "number") {
        throw new TypeError("length should be a integer");
      }

      const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

      const chars = [...numbers];

      const array = new Array(length).fill(null).map(() => {
        const char = chars[Math.floor(Math.random() * chars.length)];

        return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
      });

      return array.join("");
    },
  };
};

export const createAuthService = (serviceConfig: AuthServiceConfig) => {
  return AuthService(serviceConfig);
};

type AuthServiceConfig = {
  secret: string;
};
