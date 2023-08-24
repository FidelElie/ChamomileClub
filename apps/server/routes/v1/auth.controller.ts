import {
	StartAuthProcessInterfaces,
	ValidateLoginCodeInterfaces ,
	UpdateCurrentUserInterfaces
} from "@thechamomileclub/api";

import { ApiRequestWithAuth, Controller } from "@/library/server";

import { exposeSession, validateRequestEntities } from "@/library/middlewares";

import * as AuthControllerService from "./auth.controller.service";

const AuthController = Controller<ApiRequestWithAuth>("/auth");

AuthController.get("/", exposeSession, AuthControllerService.getCurrentUser);

AuthController.post(
	"/",
	validateRequestEntities(StartAuthProcessInterfaces),
	AuthControllerService.startAuthProcess
);

AuthController.put(
	"/",
	validateRequestEntities(ValidateLoginCodeInterfaces),
	AuthControllerService.validateLoginCode
);

AuthController.patch(
	"/",
	exposeSession,
	validateRequestEntities(UpdateCurrentUserInterfaces),
	AuthControllerService.updateCurrentUser
);

AuthController.delete("/", exposeSession, AuthControllerService.logoutUser);

export default AuthController;
