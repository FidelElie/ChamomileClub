import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { Button, Copy, Flex, Show } from "@thechamomileclub/ui";

import { useFetchUsers } from "@/library/queries";

import { DisplayLayout } from "@/components/interfaces";

import type { EditEventFields, EventFields } from "@/components/screens/auth/create-event/create-event.data";
import { EventConfirmationStage } from "@/components/screens/auth/create-event/EventConfirmationStage";
import { EventDetailsStage } from "@/components/screens/auth/create-event/EventDetailsStage";
import { EventMembersStage } from "@/components/screens/auth/create-event/EventMembersStage";

import { useEnsureAuth } from "@/components/providers";

const STAGE_DATA = [
  {
    stage: "DETAILS",
    subtitle: "Tell us the details",
    Component: EventDetailsStage,
  },
  {
    stage: "MEMBERS",
    subtitle: "Who is invited?",
    Component: EventMembersStage,
  },
  {
    stage: "CONFIRMATION",
    subtitle: "Confirm the details",
    Component: EventConfirmationStage,
  },
] as const;

const CreateEventScreen = () => {
  const { user } = useEnsureAuth();

  const navigation = useNavigation();

  const [stage, setStage] = useState<(typeof STAGE_DATA)[number]["stage"]>(
    STAGE_DATA[0].stage,
  );
  const [fields, setFields] = useState<EventFields>({
    name: "",
    description: "",
    members: [{
      id: user.id,
      forename: user.forename,
      surname: user.surname,
      email: user.email,
      roles: user.roles,
    }],
    invitations: [],
    startDate: null,
    poll: null,
  });

  const foundersQuery = useFetchUsers({ role: "FOUNDER" });

  const editFields: EditEventFields = (data) =>
    setFields((currentFields) => ({
      ...currentFields,
      ...data,
    }));

  const correspondingStageData = STAGE_DATA.find(
    (data) => data.stage === stage,
  );

  const userIsFounder = (userId: string) => {
    if (!foundersQuery.isSuccess) { return false; }

    return foundersQuery.data.items.some(founder => founder.id === userId);
  };

  const isFounder = user.roles.includes("FOUNDER") || false;

  const isInvalidSubmission = () => {
    switch (stage) {
      case "DETAILS":
        return !fields.startDate && !fields.poll?.name;
      default:
        return false;
    }
  };

  const handleStageNavigation = (navigationParams: StageNavigationParams) => {
    const { direction, stage: newStage } = navigationParams;

    if (
      newStage
      && STAGE_DATA.some((stageData) => stageData.stage === newStage)
      && !isInvalidSubmission()
    ) {
      return setStage(newStage);
    }

    const currentIndex = STAGE_DATA.findIndex((data) => data.stage === stage);

    const newIndex = currentIndex + (direction || 0);

    if (newIndex < 0) {
      return navigation.goBack();
    }

    if (newIndex > STAGE_DATA.length - 1) {
      handleEventCreation();
    }

    setStage(STAGE_DATA[newIndex].stage);
  };

  const handleEventCreation = async () => {
    // try {
    //   // con
    // } catch (error: unknown) {
    //   console.error(error);
    // }
  };

  return (
    <Show if={correspondingStageData}>
      {stageData =>
        foundersQuery.isSuccess && (
          <DisplayLayout
            title={`${!userIsFounder(user.id) ? "Request" : "Create"} Event`}
            subtitle={stageData.subtitle}
            onBack={() => handleStageNavigation({ direction: -1 })}
            safe
          >
            <Flex.Column className="flex-grow">
              <stageData.Component
                fields={fields}
                editFields={editFields}
                founders={foundersQuery.data.items}
                isFounder={isFounder}
              />
            </Flex.Column>
            <Button.Secondary
              onPressIn={() => handleStageNavigation({ direction: 1 })}
              disabled={isInvalidSubmission()}
            >
              <Copy color="green">Continue</Copy>
            </Button.Secondary>
          </DisplayLayout>
        )}
    </Show>
  );
};

type StageNavigationParams =
  | { direction: 1 | -1; stage?: never; }
  | { stage: (typeof STAGE_DATA)[number]["stage"]; direction?: never; };

export default CreateEventScreen;
