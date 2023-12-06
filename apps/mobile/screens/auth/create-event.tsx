import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Button, Copy, Flex } from "@thechamomileclub/ui";

import { useEnsureAuth } from "@/library/providers";

import { DisplayLayout } from "@/components/interfaces";

import type {
	EditEventFields,
	EventFields
} from "@/components/screens/auth/create-event/create-event.data";
import { EventDetailsStage } from "@/components/screens/auth/create-event/EventDetailsStage";
import { EventMembersStage } from "@/components/screens/auth/create-event/EventMembersStage";
import {
	EventConfirmationStage
} from "@/components/screens/auth/create-event/EventConfirmationStage";

const STAGE_DATA = [
	{ stage: "DETAILS", subtitle: "Tell us the details", Component: EventDetailsStage },
	{ stage: "MEMBERS", subtitle: "Who is invited?", Component: EventMembersStage },
	{ stage: "CONFIRMATION", subtitle: "Confirm the details", Component: EventConfirmationStage },
] as const;

const CreateEventScreen = () => {
	const { user } = useEnsureAuth();

	const navigation = useNavigation();

	const [stage, setStage] = useState<typeof STAGE_DATA[number]["stage"]>(STAGE_DATA[0].stage);
	const [fields, setFields] = useState<EventFields>({
		name: "",
		description: "",
		members: [],
		invitations: [],
		startDate: null,
		poll: null
	});

	const editFields: EditEventFields = (data) => setFields(
		currentFields => ({ ...currentFields, ...data })
	);

	const correspondingStageData = STAGE_DATA.find(data => data.stage === stage)!;

	const isFounder = user.roles.includes("FOUNDER") || false;

	const handleStageNavigation = (navigationParams : StageNavigationParams) => {
		const { direction, stage: newStage } = navigationParams;

		if (newStage && STAGE_DATA.some(stageData => stageData.stage === newStage)) {
			return setStage(newStage);
		}

		const currentIndex = STAGE_DATA.findIndex(data => data.stage === stage);

		const newIndex = currentIndex + (direction || 0);

		if (newIndex < 0) { return navigation.goBack(); }

		if (newIndex > STAGE_DATA.length - 1) { handleEventCreation(); }

		setStage(STAGE_DATA[newIndex].stage);
	}

	const handleEventCreation = async () => {
		try {
			// con
		} catch (error) {
			console.error(error);

		}
	}

	return (
		<DisplayLayout
			title={`${!isFounder ? "Request" : "Create"} Event`}
			subtitle={correspondingStageData.subtitle}
			onBack={() => handleStageNavigation({ direction: -1 })}
			safe
		>
			<Flex.Column className="flex-grow">
				<correspondingStageData.Component
					isFounder={isFounder}
					fields={fields}
					editFields={editFields}
				/>
			</Flex.Column>
			<Button.Secondary onPressIn={() => handleStageNavigation({ direction: 1 })}>
				<Copy color="green">Continue</Copy>
			</Button.Secondary>
		</DisplayLayout>
	)
}

type StageNavigationParams =
{ direction: 1 | -1; stage?: never; } |
{ stage: typeof STAGE_DATA[number]["stage"]; direction?: never }

export default CreateEventScreen;
