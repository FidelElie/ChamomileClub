import "reflect-metadata";
import { createServerRouter } from "./library/core";
import { container } from "tsyringe";

import { getXataClient } from "@thechamomileclub/database";

import AuthController from "./routes/auth.controller";

import { morganMiddleware } from "./middlewares/morgan.middleware";

import { DatabaseService } from "./services";

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
