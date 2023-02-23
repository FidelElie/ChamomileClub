import "reflect-metadata";
import { createServerRouter } from "./library/core";
import { container } from "tsyringe";

import AuthController from "./routes/auth.controller";

import { morganMiddleware } from "./middlewares/morgan.middleware";

import { DatabaseService } from "./services";
import { getXataClient } from "@thechamomileclub/database";

const controllers = [
	AuthController
]

const middlewares = [
	morganMiddleware
]

container.register<DatabaseService>(
	DatabaseService,
	{ useValue: new DatabaseService(getXataClient())
});

export default createServerRouter({
	controllers,
	middlewares
});
