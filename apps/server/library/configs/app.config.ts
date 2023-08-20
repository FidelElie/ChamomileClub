import { checkEnvironmentVariable } from "@/library/utilities";

const APP_SECRET = checkEnvironmentVariable(
	"APP_SECRET",
	process.env.APP_SECRET,
	() => { if (process.env.NODE_ENV === 'development') { return "development"; } }
);

const AWS_SES_ACCESS_KEY = checkEnvironmentVariable(
	"AWS_SES_ACCESS_KEY", process.env.AWS_SES_ACCESS_KEY
);

const AWS_SES_SECRET_ACCESS_KEY = checkEnvironmentVariable(
	"AWS_SES_SECRET_ACCESS_KEY", process.env.AWS_SES_SECRET_ACCESS_KEY
);

const SENT_FROM_EMAIL = checkEnvironmentVariable(
	"SENT_FROM_EMAIL", process.env.SENT_FROM_EMAIL
);

const SENT_FROM_NAME = checkEnvironmentVariable(
	"SENT_FROM_NAME", process.env.SENT_FROM_NAME,
);

export const AppConfig = {
	secret: APP_SECRET,
	emails: {
		region: process.env.AWS_SES_REGION,
		clientId: AWS_SES_ACCESS_KEY,
		secretKey: AWS_SES_SECRET_ACCESS_KEY,
		senderEmail: SENT_FROM_EMAIL,
		senderName: SENT_FROM_NAME
	}
}
