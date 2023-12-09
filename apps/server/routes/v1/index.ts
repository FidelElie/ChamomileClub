import { ControllerGroup } from "@/library/server";

import AuthController from "./auth.controller";
import EventsController from "./events.controller";
import UsersController from "./users.controller";

export default ControllerGroup({
  path: "/v1",
  controllers: [AuthController, EventsController, UsersController],
});
