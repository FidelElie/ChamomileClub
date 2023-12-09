import { PollEntity } from "@thechamomileclub/api";

export type EventFields = {
  name: string;
  description: string;
  members: object[];
  invitations: object[];
  startDate: null | Date;
  poll: null | PollEntity;
};

export type EditEventFields = (data: Partial<EventFields>) => void;

export type CreateEventsInterface = {
  fields: EventFields;
  editFields: EditEventFields;
  isFounder: boolean;
};
