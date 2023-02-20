import { createServerRouter } from "./library/core";

import AuthController from "./routes/auth.controller";

import { morganMiddleware } from "./middlewares/morgan.middleware";

import { APP_SECRET } from "./config";

const controllers = [
	AuthController
]

const middlewares = [
	morganMiddleware
]

export default createServerRouter({
	controllers,
	middlewares
});
