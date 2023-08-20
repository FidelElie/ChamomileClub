import { SESClient } from "@aws-sdk/client-ses";

import { AppConfig } from "./app.config";

declare global {
	var emailClient: SESClient
}

let emailClient: SESClient;

if (process.env.NODE_ENV === "development") {
	if (!global.emailClient) {
		const client = new SESClient({
			region: AppConfig.emails.region || "eu-west-2",
			credentials: {
				accessKeyId: AppConfig.emails.clientId,
				secretAccessKey: AppConfig.emails.secretKey
			}
		});

		global.emailClient = client;
	}

	emailClient = global.emailClient;
} else {
	emailClient = new SESClient({
		region: AppConfig.emails.region || "eu-west-2",
		credentials: {
			accessKeyId: AppConfig.emails.clientId,
			secretAccessKey: AppConfig.emails.secretKey
		}
	});
}

export default emailClient;
