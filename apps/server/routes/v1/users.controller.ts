import {
  CreateUsersInterfaces,
  DeleteUserInterfaces,
  EditUserInterfaces,
  FetchUsersInterfaces,
} from "@thechamomileclub/api";

import { dependencyMap } from "@/library/configs";
import { requireAuthGuard, requireRolesGuard, validateRequestEntities } from "@/library/middlewares";
import { ApiRequestWithAuth, Controller } from "@/library/server";

import { createUsersControllerService } from "./users.controller.service";

const UsersController = Controller<ApiRequestWithAuth>("/users");

const UsersControllerService = createUsersControllerService(dependencyMap);

UsersController.get(
  "/",
  dependencyMap.exposeSession,
  requireAuthGuard,
  validateRequestEntities(FetchUsersInterfaces),
  UsersControllerService.fetchUsers,
);

UsersController.post(
  "/",
  dependencyMap.exposeSession,
  requireRolesGuard(["FOUNDER"]),
  validateRequestEntities(CreateUsersInterfaces),
  UsersControllerService.createUsers,
);

UsersController.patch(
  "/:userId",
  dependencyMap.exposeSession,
  requireRolesGuard(["FOUNDER"]),
  validateRequestEntities(EditUserInterfaces),
  UsersControllerService.editUser,
);

UsersController.delete(
  "/:userId",
  dependencyMap.exposeSession,
  requireRolesGuard(["FOUNDER"]),
  validateRequestEntities(DeleteUserInterfaces),
  UsersControllerService.deleteUser,
);

export default UsersController;
