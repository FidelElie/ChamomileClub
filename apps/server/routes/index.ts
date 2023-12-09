import morgan from "morgan";
import cors from "cors";

import { createServerRouter } from "@/library/server";

import { default as VersionOneAPI } from "./v1";

export default createServerRouter({
  middlewares: [cors(), morgan("dev")],
  controllers: [VersionOneAPI],
});
