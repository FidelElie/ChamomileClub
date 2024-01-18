import { useState } from "react";

import { useQueryClient, type UserEntity } from "@thechamomileclub/api";
import { Button, Copy, Flex, Show, TextField } from "@thechamomileclub/ui";

import { useUpdateCurrentUser } from "@/library/queries";

type Stages = "INTRODUCTION" | "DETAILS";

export const OnboardingFlow = (props: { user: UserEntity; }) => {
  const { user } = props;

  const queryClient = useQueryClient();
  const updateCurrentUser = useUpdateCurrentUser({
    onSuccess: () => queryClient.invalidateQueries(["user"]),
  });
  const [stage, setStage] = useState<Stages>("INTRODUCTION");
  const [fields, setFields] = useState({ nickname: user.nickname || "" });

  const editFields = (data: Partial<typeof fields>) =>
    setFields((currentFields) => ({
      ...currentFields,
      ...data,
    }));

  const handleStageSubmission = () => {
    if (stage === "INTRODUCTION") {
      setStage("DETAILS");
    } else {
      handleMembershipConfirmation();
    }
  };

  const handleMembershipConfirmation = async () => {
    try {
      await updateCurrentUser.mutateAsync({
        ...(fields.nickname ? { nickname: fields.nickname } : {}),
        active: true,
      });
      queryClient.invalidateQueries(["auth"]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  return (
    <Flex className="w-full space-y-8">
      <Show if={stage === "INTRODUCTION"}>
        <Flex className="flex-grow space-y-3">
          <Copy color="cream" className="text-center">
            {user.description}
          </Copy>
        </Flex>
      </Show>
      <Show if={stage === "DETAILS"}>
        <TextField
          className="w-full"
          placeholder="NICKNAME (OPTIONAL)"
          textAlign="center"
          onChangeText={(nickname) => editFields({ nickname })}
        />
      </Show>
      <Flex>
        <Button.Primary onPressIn={handleStageSubmission}>
          <Copy>
            {stage === "INTRODUCTION" ? "Get started" : "Confirm Membership"}
          </Copy>
        </Button.Primary>
        <Show if={stage === "DETAILS"}>
          <Button.Secondary
            onPressIn={() => setStage("INTRODUCTION")}
            className="mt-3"
          >
            <Copy color="green">Back</Copy>
          </Button.Secondary>
        </Show>
      </Flex>
    </Flex>
  );
};
