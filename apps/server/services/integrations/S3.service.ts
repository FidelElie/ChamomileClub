import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const DEFAULT_SERVICE_CONFIG = { links: { expiresIn: 3600 } };

const S3Service = (config: S3ServiceConfig) => {
  const { client, links } = Object.assign(DEFAULT_SERVICE_CONFIG, config);

  const getLinkExpirationTime = (override?: number) => {
    return override || links.expiresIn;
  };

  return {
    createUploadUrl: (urlConfig: SignedURLConfig) => {
      const { bucket: Bucket, path: Key, expiresIn } = urlConfig;

      const command = new PutObjectCommand({ Bucket, Key });

      return getSignedUrl(client, command, { expiresIn: getLinkExpirationTime(expiresIn) });
    },
    getDownloadUrl: (urlConfig: SignedURLConfig) => {
      const { bucket: Bucket, path: Key, expiresIn } = urlConfig;

      const command = new GetObjectCommand({ Bucket, Key });

      return getSignedUrl(client, command, { expiresIn: getLinkExpirationTime(expiresIn) });
    },
  };
};

export const createS3Service = (config: S3ServiceConfig) => S3Service(config);

type SignedURLConfig = {
  bucket: string;
  path: string;
  expiresIn?: number;
};

export type S3ServiceConfig = {
  client: S3Client;
  links?: {
    expiresIn?: number;
  };
};
