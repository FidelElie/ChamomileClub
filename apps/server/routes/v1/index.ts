import { ControllerGroup } from "@/library/server";

import AuthController from "./auth.controller";

export default ControllerGroup({
	path: "/v1",
	controllers: [
		AuthController
	]
});
