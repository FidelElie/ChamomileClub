import { AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";
import { ScrollView } from "react-native";

import { COLORS } from "@thechamomileclub/common";
import { Button, Card, Copy, Flex, For, Heading, Show } from "@thechamomileclub/ui";

import type { CreateEventsInterface } from "@/components/screens/auth/create-event/create-event.data";

export const EventConfirmationStage = (props: CreateEventsInterface) => {
  const { fields, editFields } = props;

  return (
    <Card className="items-center p-0 overflow-hidden flex-grow mb-5 pb-3">
      <Show if={fields.name}>
        <Flex.Column className="bg-white w-full py-2 items-center">
          <Heading color="green">{fields.name}</Heading>
        </Flex.Column>
      </Show>
      <Show if={fields.description}>
        <Flex.Column className="m-4 items-center">
          <Heading>Description</Heading>
          <Copy className="text-center">{fields.description}</Copy>
        </Flex.Column>
      </Show>
      <Flex.Column className="bg-white mt-3 w-full py-2 items-center">
        <Heading color="green">Date</Heading>
      </Flex.Column>
      <Copy className="my-5">
        {fields.startDate ? dayjs(fields.startDate).format("DD/MM/YYYY HH:mm") : "TBC"}
      </Copy>
      <Flex.Column className="bg-white w-full py-2 items-center mb-3">
        <Heading color="green">Attendees</Heading>
      </Flex.Column>
      <ScrollView className="w-full">
        <For each={fields.members}>
          {member => (
            <Flex.Row className="items-center w-full py-2 px-5">
              <Button className="w-14 h-14 rounded-full border border-white mr-4">
                <AntDesign name="download" color={COLORS.white} size={15} />
              </Button>
              <Flex.Column>
                <Heading>{member.forename} {member.surname}</Heading>
                <Copy color="yellow">{member.roles[0]}</Copy>
              </Flex.Column>
            </Flex.Row>
          )}
        </For>
        <For each={fields.invites}>
          {invitee => (
            <Flex.Row className="items-center w-full py-2 px-5">
              <Button className="w-14 h-14 rounded-full border border-white mr-4">
                <AntDesign name="download" color={COLORS.white} size={15} />
              </Button>
              <Flex.Column>
                <Heading>{invitee.forename} {invitee.surname}</Heading>
                <Copy color="yellow">New Member</Copy>
              </Flex.Column>
            </Flex.Row>
          )}
        </For>
      </ScrollView>
    </Card>
  );
};
