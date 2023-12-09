import { S3Service, createS3Service } from "@/services";

declare global {
  // eslint-disable-next-line no-var
  var S3: ReturnType<typeof S3Service>;
}

let S3: ReturnType<typeof S3Service>;

const s3Config = {};

if (process.env.NODE_ENV === "development") {
  if (!global.S3) {
    global.S3 = createS3Service(s3Config);
  }

  S3 = global.S3;
} else {
  S3 = createS3Service(s3Config);
}

export default S3;
