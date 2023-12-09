import {
  DateTimeField,
  Flex,
  Heading,
  Show,
  TextField,
} from "@thechamomileclub/ui";

import type { CreateEventsInterface } from "./create-event.data";

export const EventDetailsStage = (props: CreateEventsInterface) => {
  const { fields, editFields, isFounder } = props;

  return (
    <Flex.Column>
      <Show if={isFounder}>
        <Heading className="mb-5 mt-3" size="base">
          What is it about?
        </Heading>
        <TextField
          placeholder="EVENT NAME"
          textAlign="center"
          className="mb-3"
          value={fields.name}
          onChangeText={(name) => editFields({ name })}
        />
        <TextField
          placeholder="EVENT DESCRIPTION (OPTIONAL)"
          textAlign="center"
          className="h-32"
          value={fields.description}
          onChangeText={(description) => editFields({ description })}
        />
      </Show>
      <Heading className="mb-3 mt-5" size="base">
        When will it happen?
      </Heading>
      <DateTimeField
        theme="TERTIARY"
        // value={new Date()}
      />
    </Flex.Column>
  );
};
