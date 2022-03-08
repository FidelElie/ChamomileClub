import Flex, { type FlexProps } from "./Flex";

export default {
	title: "Core/Layouts/Flex",
	component: Flex
}

const Template = (args: FlexProps) => <Flex {...args} />

export const Basic = Template.bind({});
