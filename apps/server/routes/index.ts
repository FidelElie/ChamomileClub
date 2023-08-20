import morgan from "morgan";

import { createServerRouter } from "@/library/server";

import { default as VersionOneAPI } from "./v1";

export default createServerRouter({
	middlewares: [
		morgan("dev")
	],
	controllers: [VersionOneAPI]
});
