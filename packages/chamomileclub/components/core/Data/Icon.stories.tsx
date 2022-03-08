import Icon, { type IconProps } from "./Icon";

export default {
	title: "Core/Data/Icon",
	component: Icon
}

const Template = (args: IconProps) => <Icon {...args} />

export const Basic = Template.bind({});
