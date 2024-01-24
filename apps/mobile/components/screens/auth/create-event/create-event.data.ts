import type { CreateEventsInterfaces, InferDTOs, UserEntity } from "@thechamomileclub/api";

export type EventFields = InferDTOs<
  typeof CreateEventsInterfaces["request"]
>["body"]["entries"][number];

export type EventAttendee = Pick<UserEntity, "forename" | "surname" | "email">;

export type EditEventFields = (data: Partial<EventFields>) => void;

export type CreateEventsInterface = {
  fields: EventFields;
  editFields: EditEventFields;
  founders: UserEntity[];
  isFounder: boolean;
};
