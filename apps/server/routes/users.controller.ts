import { Get, Post } from "next-api-decorators";
import { autoInjectable } from "tsyringe";

import {
	CreateUsersBodySchema,
	type CreateUsersBody
} from "@thechamomileclub/api";

import { Controller, AuthGuard, ValidatedBody } from "@/library/decorators";

import UserControllerService from "./users.controller.service";

const baseUrl = "/users";

@autoInjectable()
@Controller(baseUrl)
export default class UsersController {
	constructor(private readonly userControllerService: UserControllerService) {}

	@Get(baseUrl)
	@AuthGuard("founder")()
	async getUsers() {
		return await this.userControllerService.getAppUsers();
	}

	@Post(baseUrl)
	@AuthGuard("founder")()
	async createUsers(@ValidatedBody(CreateUsersBodySchema)() body: CreateUsersBody) {
		return await this.userControllerService.createUsers(body);
	}
}
