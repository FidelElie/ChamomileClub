import { Controller } from "@/library/server";

import * as AuthControllerService from "./auth.controller.service";

const AuthController = Controller("/auth");

AuthController.router.get(AuthControllerService.getCurrentUser);

AuthController.router.post(AuthControllerService.startAuthProcess);

AuthController.router.put(AuthControllerService.validateLoginCode);

AuthController.router.patch(AuthControllerService.updateCurrentUser)

export default AuthController;
