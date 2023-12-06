import { twJoin } from "tailwind-merge";

import { Flex, Show, Heading, Copy, Button } from "@thechamomileclub/ui";

export const ToggleCardButton = (props: ToggleCardButtonProps) => {
	const { classes, title, subtitle, toggled, onToggle } = props;

	return (
		<Button
			className={twJoin(
				"rounded-lg py-4 px-3 border",
				!toggled ? "border border-white" : "bg-midnight border-midnight",
				classes
			)}
			onPressIn={() => onToggle(toggled)}
		>
			<Flex.Row className="w-full">
				<Flex
					className="w-6 h-6 justify-center items-center border rounded-full border-white mr-2.5"
				>
					<Show if={toggled}>
						<Flex className="w-4 h-4 rounded-full bg-yellow" />
					</Show>
				</Flex>
				<Flex.Column className="flex-grow">
					<Heading>{title}</Heading>
					<Copy size="xs">{subtitle}</Copy>
				</Flex.Column>
			</Flex.Row>
		</Button>
	)
}

export interface ToggleCardButtonProps {
	classes?: string;
	title: string;
	subtitle: string;
	toggled: boolean;
	onToggle: (currentToggledState: boolean) => void;
}
