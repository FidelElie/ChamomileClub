import { AppConfig } from "./app.config";

import { S3Service, createS3Service } from "@/services";

declare global {
	var S3: ReturnType<typeof S3Service>
}

let S3: ReturnType<typeof S3Service>;

const s3Config = {

}

const serviceConfig = {

}

if (process.env.NODE_ENV === "development") {
	if (!global.S3) {
		global.S3 = createS3Service(s3Config);
	}

	S3 = global.S3
} else {
	S3 = createS3Service(s3Config);
}

export default S3;
