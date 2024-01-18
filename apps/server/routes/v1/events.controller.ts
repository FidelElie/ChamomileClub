import { CreateEventsInterfaces, EditEventInterfaces, FetchEventsInterfaces } from "@thechamomileclub/api";

import { dependencyMap } from "@/library/configs";
import { requireAuthGuard, validateRequestEntities } from "@/library/middlewares";
import { ApiRequestWithAuth, Controller } from "@/library/server";

import { createEventsControllerService } from "./events.controller.service";

const EventsController = Controller<ApiRequestWithAuth>("/events");

const EventsControllerService = createEventsControllerService(dependencyMap);

EventsController.get(
  "/",
  dependencyMap.exposeSession,
  requireAuthGuard,
  validateRequestEntities(FetchEventsInterfaces),
  EventsControllerService.fetchEvents,
);

EventsController.post(
  "/",
  dependencyMap.exposeSession,
  requireAuthGuard,
  validateRequestEntities(CreateEventsInterfaces),
  EventsControllerService.createEvents,
);

EventsController.patch(
  "/:eventId",
  dependencyMap.exposeSession,
  requireAuthGuard,
  validateRequestEntities(EditEventInterfaces),
  EventsControllerService.editEvent,
);

export default EventsController;
