import Box, { type BoxProps } from "./Box";

export default {
	title: "Core/Layouts/Box",
	component: Box
}

const Template = (args: BoxProps) => <Box {...args} />

export const Basic = Template.bind({});
