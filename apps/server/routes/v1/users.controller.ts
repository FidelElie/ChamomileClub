import {
  CreateUsersInterfaces,
  DeleteUserInterfaces,
  EditUserInterfaces,
  FetchUsersInterfaces,
} from "@thechamomileclub/api";

import { ApiRequestWithAuth, Controller } from "@/library/server";
import {
  exposeSession,
  requireAuthGuard,
  requireRolesGuard,
  validateRequestEntities,
} from "@/library/middlewares";

import * as UsersControllerService from "./users.controller.service";

const UsersController = Controller<ApiRequestWithAuth>("/users");

UsersController.get(
  "/",
  exposeSession,
  requireAuthGuard,
  validateRequestEntities(FetchUsersInterfaces),
  UsersControllerService.fetchUsers,
);

UsersController.post(
  "/",
  exposeSession,
  requireRolesGuard(["FOUNDER"]),
  validateRequestEntities(CreateUsersInterfaces),
  UsersControllerService.createUsers,
);

UsersController.patch(
  "/:userId",
  exposeSession,
  requireRolesGuard(["FOUNDER"]),
  validateRequestEntities(EditUserInterfaces),
  UsersControllerService.editUser,
);

UsersController.delete(
  "/:userId",
  exposeSession,
  requireRolesGuard(["FOUNDER"]),
  validateRequestEntities(DeleteUserInterfaces),
  UsersControllerService.deleteUser,
);

export default UsersController;
