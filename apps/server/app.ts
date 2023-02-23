import "reflect-metadata";
import { container } from "tsyringe";

import { getXataClient } from "@thechamomileclub/database";

import { createServerRouter } from "./library/router";
import type { ApiRequestWithUser } from "./library/types/api.types";

import * as controllers from "./routes";

import { morganMiddleware, identificationMiddleware } from "./middlewares";

import { DatabaseService } from "./services";

const middlewares = [
	identificationMiddleware,
	morganMiddleware
]

container.register<DatabaseService>(
	DatabaseService,
	{ useValue: new DatabaseService(getXataClient())
});

export default createServerRouter<ApiRequestWithUser>({
	controllers: Object.values(controllers),
	middlewares
});
