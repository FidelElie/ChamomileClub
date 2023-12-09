import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

export const createS3Service = (s3Config: S3ClientConfig) => {
  const s3Client = new S3Client(s3Config);

  return S3Service(s3Client);
};

export const S3Service = (client: S3Client) => {
  return client;
};
