import { useState } from "react";

import { Flex, Show } from "@thechamomileclub/ui";

import { PickerInviteDisplay } from "./_UserPicker/PickerInviteDisplay";
import { PickerSearchDisplay } from "./_UserPicker/PickerSearchDisplay";

import type { UserPickerDisplays, UserPickerSharedInterface } from "./UserPicker.data";

export const UserPicker = (props: Omit<UserPickerSharedInterface, "setDisplay">) => {
  const { onInvite } = props;

  const [display, setDisplay] = useState<UserPickerDisplays>("SEARCH");

  return (
    <Flex.Column>
      <Show if={display === "SEARCH"}>
        <PickerSearchDisplay {...props} setDisplay={setDisplay} />
      </Show>
      <Show if={display === "INVITE" && onInvite}>
        <PickerInviteDisplay {...props} setDisplay={setDisplay} />
      </Show>
    </Flex.Column>
  );
};
