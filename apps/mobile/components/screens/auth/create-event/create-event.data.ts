import { PollSchema } from "@thechamomileclub/api";

export type EventFields = {
	name: string;
	description: string;
	members: {}[];
	invitations: {}[];
	startDate: null | Date;
	poll: null | PollSchema;
}

export type EditEventFields = (data: Partial<EventFields>) => void;

export type CreateEventsInterface = {
	fields: EventFields;
	editFields: EditEventFields;
	isFounder: boolean;
}
