import Container, { type ContainerProps } from "./Container";

export default {
	title: "Core/Layouts/Container",
	component: Container
}

const Template = (args: ContainerProps) => <Container {...args} />

export const Basic = Template.bind({});
