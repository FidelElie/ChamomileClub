import {
	CreateEventsInterfaces,
	EditEventInterfaces,
	FetchEventsInterfaces
} from "@thechamomileclub/api";

import { validateRequestEntities } from "@/library/middlewares";
import { ApiRequestWithAuth, Controller } from "@/library/server";

import * as EventControllerService from "./events.controller.service";

const EventController = Controller<ApiRequestWithAuth>("/events");

EventController.get(
	"/",
	validateRequestEntities(FetchEventsInterfaces),
	EventControllerService.fetchEvents
);

EventController.post(
	"/",
	validateRequestEntities(CreateEventsInterfaces),
	EventControllerService.createEvents
);

EventController.patch(
	"/:eventId",
	validateRequestEntities(EditEventInterfaces),
	EventControllerService.editEvent
);

export default EventController;
