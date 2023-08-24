import { Controller } from "@/library/server";

import { RequestWithAuth } from "@/library/types";
import { sessionMiddleware } from "@/library/middlewares";

import * as AuthControllerService from "./auth.controller.service";

const AuthController = Controller<RequestWithAuth>("/auth");

AuthController.get("/", sessionMiddleware, AuthControllerService.getCurrentUser);

AuthController.post("/", AuthControllerService.startAuthProcess);

AuthController.put("/", AuthControllerService.validateLoginCode);

AuthController.patch("/", sessionMiddleware, AuthControllerService.updateCurrentUser);

AuthController.delete("/", sessionMiddleware, AuthControllerService.logoutUser);

export default AuthController;
