import Typography, { type TypographyProps } from "./Typography";

export default {
	title: "Core/Data/Typography",
	component: Typography
}

const Template = (args: TypographyProps) => <Typography {...args}/>

export const Basic = Template.bind({});
Basic.args = {
	children: "Typography"
}
