import {
  StartAuthProcessInterfaces,
  UpdateCurrentUserInterfaces,
  ValidateLoginCodeInterfaces,
} from "@thechamomileclub/api";

import { dependencyMap } from "@/library/configs";
import { validateRequestEntities } from "@/library/middlewares";
import { ApiRequestWithAuth, Controller } from "@/library/server";

import { createAuthControllerService } from "./auth.controller.service";

const AuthController = Controller<ApiRequestWithAuth>("/auth");

const AuthControllerService = createAuthControllerService(dependencyMap);

AuthController.get("/", dependencyMap.exposeSession, AuthControllerService.getCurrentUser);

AuthController.post(
  "/",
  validateRequestEntities(StartAuthProcessInterfaces),
  AuthControllerService.startAuthProcess,
);

AuthController.put(
  "/",
  validateRequestEntities(ValidateLoginCodeInterfaces),
  AuthControllerService.validateLoginCode,
);

AuthController.patch(
  "/",
  dependencyMap.exposeSession,
  validateRequestEntities(UpdateCurrentUserInterfaces),
  AuthControllerService.updateCurrentUser,
);

AuthController.delete("/", dependencyMap.exposeSession, AuthControllerService.logoutUser);

export default AuthController;
