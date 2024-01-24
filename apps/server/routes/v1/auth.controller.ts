import {
  StartAuthProcessInterfaces,
  UpdateCurrentUserInterfaces,
  ValidateLoginCodeInterfaces,
} from "@thechamomileclub/api";

import { dependencyMap } from "@/library/configs";
import { validateRequestEntities } from "@/library/middlewares";
import { ApiRequestWithAuth, Controller, parseContextHandler } from "@/library/server";

import { createAuthControllerService } from "./auth.controller.service";

const AuthController = Controller<ApiRequestWithAuth>("/auth");

const AuthControllerService = createAuthControllerService(dependencyMap);

AuthController.get(
  "/",
  dependencyMap.exposeSession,
  parseContextHandler(AuthControllerService.getCurrentUser),
);

AuthController.post(
  "/",
  validateRequestEntities(StartAuthProcessInterfaces),
  parseContextHandler(AuthControllerService.startAuthProcess),
);

AuthController.put(
  "/",
  validateRequestEntities(ValidateLoginCodeInterfaces),
  parseContextHandler(AuthControllerService.validateLoginCode),
);

AuthController.patch(
  "/",
  dependencyMap.exposeSession,
  validateRequestEntities(UpdateCurrentUserInterfaces),
  parseContextHandler(AuthControllerService.updateCurrentUser),
);

AuthController.delete(
  "/",
  dependencyMap.exposeSession,
  parseContextHandler(AuthControllerService.logoutUser),
);

export default AuthController;
