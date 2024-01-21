import { AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useState } from "react";

import { Button, COLORS, DateTimeField, Flex, Heading, Show, TextField } from "@thechamomileclub/ui";

import type { CreateEventsInterface } from "./create-event.data";
// import { ToggleCardButton } from "@/components/interfaces";

export const EventDetailsStage = (props: CreateEventsInterface) => {
  const { fields, editFields, isFounder } = props;

  const [createPoll] = useState(false);

  const currentDate = dayjs().set("second", 0).set("millisecond", 0).toDate();

  const twoMonthsAhead = dayjs(currentDate).add(2, "month").toDate();

  // const handleTogglingPollCreation = (state: boolean) => {
  //   setCreatePoll(state);

  //   editFields({
  //     startDate: null,
  //     poll: state ? {
  //       votesPerUser: 1,
  //       expiresAt: dayjs().toISOString(),
  //       name: "",
  //       type: "EVENT_DATE"
  //     } : null
  //   })
  // }

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
      {
        /* <Flex.Row className="mb-2">
        <ToggleCardButton
          title="Date"
          classes="mr-2"
          toggled={!createPoll}
          onToggle={() => handleTogglingPollCreation(false)}
        />
        <ToggleCardButton
          title="Poll"
          toggled={!!createPoll}
          onToggle={() => handleTogglingPollCreation(true)}
        />
      </Flex.Row> */
      }
      <Show if={!createPoll}>
        <Flex.Row className="">
          <DateTimeField
            className="flex-grow"
            theme="TERTIARY"
            value={fields.startDate}
            minimumDate={currentDate}
            maximumDate={twoMonthsAhead}
            onChange={(startDate) => editFields({ startDate })}
            formatDate={date => dayjs(date).format("D MMM YYYY HH:mm")}
            closeText="Close"
          />
          <Show if={!!fields.startDate}>
            <Button
              theme="SECONDARY"
              className="ml-2 px-3"
              onPressIn={() => editFields({ startDate: null })}
            >
              <AntDesign name="closecircle" size={15} color={COLORS.green} />
            </Button>
          </Show>
        </Flex.Row>
      </Show>
      {
        /* <Show if={fields.poll}>
        {
          (poll) => (
            <Flex>
              <TextField
                placeholder="POLL NAME"
                textAlign="center"
                className="mb-3"
                value={poll.name}
                onChangeText={(name) => editFields({ poll: { ...poll, name } })}
              />
            </Flex>
          )
        }
      </Show> */
      }
    </Flex.Column>
  );
};
