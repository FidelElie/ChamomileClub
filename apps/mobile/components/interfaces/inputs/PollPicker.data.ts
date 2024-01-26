import { PollCreationEntity, PollOptionCreationEntity } from "@thechamomileclub/api";

export type KeyedPollOption = PollOptionCreationEntity & { key: number; };

export type PollPickerFields = PollCreationEntity & {
  options: (KeyedPollOption)[];
};

export interface PollPickerSharedInterface {
  fields: PollPickerFields;
  editFields: (data: Partial<PollPickerFields>) => void;
  option: KeyedPollOption;
}
