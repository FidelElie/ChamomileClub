import { DateTimeField, Flex } from "@thechamomileclub/ui";

import { PollPickerSharedInterface } from "../PollPicker.data";

export const EventDateOption = (props: PollPickerSharedInterface) => {
  // const { editFields } = props;

  return (
    <Flex.Row>
      <DateTimeField />
    </Flex.Row>
  );
};