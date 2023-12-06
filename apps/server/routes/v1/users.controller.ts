import { CreateUsersInterfaces, FetchUsersInterfaces } from "@thechamomileclub/api";

import { ApiRequestWithAuth, Controller } from "@/library/server";
import { validateRequestEntities } from "@/library/middlewares";

import * as UsersControllerService from "./users.controller.service";

const UsersController = Controller<ApiRequestWithAuth>("/users");

UsersController.get(
	"/",
	validateRequestEntities(FetchUsersInterfaces),
	UsersControllerService.fetchUsers
);

UsersController.post(
	"/",
	validateRequestEntities(CreateUsersInterfaces),
	UsersControllerService.createUsers
);

export default UsersController;
