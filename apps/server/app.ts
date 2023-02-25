import "reflect-metadata";
import { container } from "tsyringe";

import { getXataClient } from "@thechamomileclub/database";

import { AppConfig } from "@/library/app.config";

import { createServerRouter } from "@/library/router";
import type { ApiRequestWithUser } from "@/library/types/api.types";
import emailClient from "@/library/ses.client";

import * as controllers from "./controllers";

import { morganMiddleware, createIdentificationMiddleware } from "@/library/middlewares";

import { AuthService, DatabaseService, EmailService } from "@/services";

container.register<AuthService>(
	AuthService,
	{ useValue: new AuthService(AppConfig.secret, process.env.NODE_ENV!) }
);

container.register<DatabaseService>(
	DatabaseService,
	{
		useValue: new DatabaseService(getXataClient())
	}
);

container.register<EmailService>(
	EmailService,
	{
		useValue: new EmailService(
			emailClient,
			{
				sender: { name: AppConfig.emails.senderName, email: AppConfig.emails.senderEmail }
			},
		) }
)

const authServiceInstance = container.resolve(AuthService);

const middlewares = [
	createIdentificationMiddleware(authServiceInstance),
	morganMiddleware
]

export default createServerRouter<ApiRequestWithUser>({
	controllers: Object.values(controllers),
	middlewares
});
