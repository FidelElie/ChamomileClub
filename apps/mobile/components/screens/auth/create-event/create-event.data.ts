import { PollEntity, UserEntity } from "@thechamomileclub/api";

export type EventFields = {
  name: string;
  description: string;
  members: (EventAttendee & { id: string; roles: UserEntity["roles"]; })[];
  invitations: (EventAttendee & { roles?: UserEntity["roles"]; })[];
  startDate: null | Date;
  poll: null | Pick<PollEntity, "name" | "votesPerUser" | "type" | "expiresAt">;
};

export type EventAttendee = Pick<UserEntity, "forename" | "surname" | "email">;

export type EditEventFields = (data: Partial<EventFields>) => void;

export type CreateEventsInterface = {
  fields: EventFields;
  editFields: EditEventFields;
  founders: UserEntity[];
  isFounder: boolean;
};
