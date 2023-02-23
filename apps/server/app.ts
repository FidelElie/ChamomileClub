import "reflect-metadata";
import { container } from "tsyringe";

import { getXataClient } from "@thechamomileclub/database";

import { APP_SECRET } from "config";

import { createServerRouter } from "./library/router";
import type { ApiRequestWithUser } from "./library/types/api.types";

import * as controllers from "./routes";

import { morganMiddleware, createIdentificationMiddleware } from "./middlewares";

import { AuthService, DatabaseService } from "./services";

container.register<AuthService>(
	AuthService,
	{ useValue: new AuthService(APP_SECRET, process.env.NODE_ENV!) }
);

container.register<DatabaseService>(
	DatabaseService,
	{
		useValue: new DatabaseService(getXataClient())
	}
);

const authServiceInstance = container.resolve(AuthService)

const middlewares = [
	createIdentificationMiddleware(authServiceInstance),
	morganMiddleware
]

export default createServerRouter<ApiRequestWithUser>({
	controllers: Object.values(controllers),
	middlewares
});
