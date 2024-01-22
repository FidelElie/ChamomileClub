import { UserCreationEntity, UserInviteeCreationEntity } from "@thechamomileclub/api";

export type UserPickerDisplays = "SEARCH" | "INVITE";

export type UserPickerSharedInterface = {
  setDisplay: (display: UserPickerDisplays) => void;
  onInvite?: (invitee: UserInviteeCreationEntity) => void;
  onSelect?: (member: UserCreationEntity) => void;
  addRoles?: boolean;
  currentEmails?: string[];
};
