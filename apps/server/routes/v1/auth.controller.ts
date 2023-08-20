import { Controller } from "@/library/server";

import * as AuthControllerService from "./auth.controller.service";

const AuthController = Controller("/auth");

AuthController.router.post(AuthControllerService.startAuthProcess);

AuthController.router.put(AuthControllerService.validateLoginCode);

export default AuthController;
