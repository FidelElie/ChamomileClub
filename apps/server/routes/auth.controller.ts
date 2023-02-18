import { Controller } from "@/library/core/decorators";
import { Get } from "next-api-decorators";

const baseUrl = "/auth";

@Controller(baseUrl)
export default class AuthController {

	@Get(baseUrl)
	test() {
		return "Hello World";
	}
}
