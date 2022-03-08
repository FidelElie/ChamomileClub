import Form, { type FormProps } from "./Form";

export default {
	title: "Core/Utilities/Form",
	component: Form
}

const Template = (args: FormProps) => <Form {...args} />

export const Basic = Template.bind({});
