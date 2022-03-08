import Image, { type ImageProps } from "./Image";

export default {
	title: "Core/Data/Image",
	component: Image
}

const Template = (args: ImageProps) => <Image {...args} />

export const Basic = Template.bind({});
