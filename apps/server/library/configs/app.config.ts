import { z } from "@thechamomileclub/api";

const NODE_ENV = process.env.NODE_ENV;

const environmentVariable = (length = 1) => z.string().min(length);

const EnvironmentVariableSchema = z.object({
  // Server
  APP_SECRET: z.string().catch(() => {
    if (NODE_ENV === "production") { throw new Error("APP_SECRET is missing from config"); }

    return "super-secret-development-code";
  }),
  SENT_FROM_EMAIL: environmentVariable().email(),
  SENT_FROM_NAME: environmentVariable(),
  // Xata
  XATA_API_KEY: environmentVariable(),
  XATA_FALLBACK_BRANCH: environmentVariable().optional(),
  // AWS SES
  AWS_SES_ACCESS_KEY: environmentVariable(),
  AWS_SES_SECRET_ACCESS_KEY: environmentVariable(),
  AWS_SES_REGION: environmentVariable().optional(),
  // AWS S3
  AWS_S3_ACCESS_KEY: environmentVariable(),
  AWS_S3_SECRET_ACCESS_KEY: environmentVariable(),
});

type EnvironmentVariableSchema = z.infer<typeof EnvironmentVariableSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariableSchema {}
  }
}

const ensuredEnvironment = EnvironmentVariableSchema.parse({
  APP_SECRET: process.env.APP_SECRET,
  SENT_FROM_EMAIL: process.env.SENT_FROM_EMAIL,
  SENT_FROM_NAME: process.env.SENT_FROM_NAME,
  XATA_API_KEY: process.env.XATA_API_KEY,
  XATA_FALLBACK_BRANCH: process.env.XATA_FALLBACK_BRANCH,
  AWS_SES_ACCESS_KEY: process.env.AWS_SES_ACCESS_KEY,
  AWS_SES_SECRET_ACCESS_KEY: process.env.AWS_SES_SECRET_ACCESS_KEY,
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

export const AppConfig = {
  env: {
    secret: ensuredEnvironment.APP_SECRET,
    SES: {
      region: ensuredEnvironment.AWS_SES_REGION,
      clientId: ensuredEnvironment.AWS_SES_ACCESS_KEY,
      secretKey: ensuredEnvironment.AWS_SES_SECRET_ACCESS_KEY,
      senderEmail: ensuredEnvironment.SENT_FROM_EMAIL,
      senderFrom: ensuredEnvironment.SENT_FROM_NAME,
    },
    S3: {
      clientId: ensuredEnvironment.AWS_S3_ACCESS_KEY,
      secretKey: ensuredEnvironment.AWS_S3_SECRET_ACCESS_KEY,
    },
  },
};
