import { S3Client } from "@aws-sdk/client-s3";
import { SESClient } from "@aws-sdk/client-ses";

import { getXataClient } from "@thechamomileclub/database";

import { AppConfig } from "./app.config";

import { createExposeSessionMiddleware } from "@/library/middlewares";
import { createS3Service, createSESService, UserService } from "@/services";

const SESService = createSESService(
  new SESClient({
    region: AppConfig.env.SES.region,
    credentials: {
      accessKeyId: AppConfig.env.SES.clientId,
      secretAccessKey: AppConfig.env.SES.secretKey,
    },
  }),
  { sender: { email: AppConfig.env.SES.senderEmail, name: AppConfig.env.SES.senderFrom } },
);

const S3Service = createS3Service(
  new S3Client({
    credentials: {
      accessKeyId: AppConfig.env.S3.clientId,
      secretAccessKey: AppConfig.env.S3.secretKey,
    },
  }),
);

const xataClient = getXataClient();

const userService = UserService({ xataClient });

const exposeSession = createExposeSessionMiddleware({ xataClient });

export const dependencyMap = {
  xataClient,
  userService,
  S3Service,
  SESService,
  exposeSession,
};
