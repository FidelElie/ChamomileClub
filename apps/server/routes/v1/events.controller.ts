import {
	CreateEventsInterfaces,
	EditEventInterfaces,
	FetchEventsInterfaces
} from "@thechamomileclub/api";

import { exposeSession, requireAuthGuard, validateRequestEntities } from "@/library/middlewares";
import { ApiRequestWithAuth, Controller } from "@/library/server";

import * as EventControllerService from "./events.controller.service";

const EventController = Controller<ApiRequestWithAuth>("/events");

EventController.get(
	"/",
	exposeSession,
	requireAuthGuard,
	validateRequestEntities(FetchEventsInterfaces),
	EventControllerService.fetchEvents
);

EventController.post(
	"/",
	exposeSession,
	requireAuthGuard,
	validateRequestEntities(CreateEventsInterfaces),
	EventControllerService.createEvents
);

EventController.patch(
	"/:eventId",
	exposeSession,
	requireAuthGuard,
	validateRequestEntities(EditEventInterfaces),
	EventControllerService.editEvent
);

export default EventController;
