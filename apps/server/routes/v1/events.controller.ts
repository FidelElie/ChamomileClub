import { CreateEventsInterfaces, EditEventInterfaces, FetchEventsInterfaces } from "@thechamomileclub/api";

import { dependencyMap } from "@/library/configs";
import { requireAuthGuard, validateRequestEntities } from "@/library/middlewares";
import { ApiRequestWithAuth, Controller, parseContextHandler } from "@/library/server";

import { createEventsControllerService } from "./events.controller.service";

const EventsController = Controller<ApiRequestWithAuth>("/events");

const EventsControllerService = createEventsControllerService(dependencyMap);

EventsController.get(
  "/",
  dependencyMap.exposeSession,
  requireAuthGuard,
  validateRequestEntities(FetchEventsInterfaces),
  parseContextHandler(EventsControllerService.fetchEvents),
);

EventsController.post(
  "/",
  dependencyMap.exposeSession,
  requireAuthGuard,
  validateRequestEntities(CreateEventsInterfaces.request),
  parseContextHandler(EventsControllerService.createEvents),
);

EventsController.patch(
  "/:eventId",
  dependencyMap.exposeSession,
  requireAuthGuard,
  validateRequestEntities(EditEventInterfaces),
  parseContextHandler(EventsControllerService.editEvent),
);

export default EventsController;
