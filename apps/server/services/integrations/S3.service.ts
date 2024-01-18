import { S3Client } from "@aws-sdk/client-s3";

export const createS3Service = (client: S3Client) => {
  return S3Service(client);
};

const S3Service = (client: S3Client) => {
  return client;
};
