import { AppConfig } from "./app.config";
import { SESService, createSESService } from "@/services";

declare global {
	var SES: ReturnType<typeof SESService>;
}

let SES: ReturnType<typeof SESService>;

const sesConfig = {
	region: AppConfig.emails.region || "eu-west-2",
	credentials: {
		accessKeyId: AppConfig.emails.clientId,
		secretAccessKey: AppConfig.emails.secretKey
	}
}

const serviceConfig = {
	sender: { email: AppConfig.emails.senderEmail, name: AppConfig.emails.senderName }
}

if (process.env.NODE_ENV === "development") {
	if (!global.SES) {
		global.SES = createSESService(sesConfig, serviceConfig);
	}

	SES = global.SES;
} else {
	SES = createSESService(sesConfig, serviceConfig);
}

export default SES;
