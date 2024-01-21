export type UserPickerDisplays = "SEARCH" | "INVITE";

export type UserPickerSharedInterface = {
  setDisplay: (display: UserPickerDisplays) => void;
  onInvite?: () => void;
  onSelect?: () => void;
  addRoles?: boolean;
};
