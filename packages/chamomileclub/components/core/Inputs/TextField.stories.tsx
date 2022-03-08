import TextField, { type TextFieldProps } from "./TextField";

export default {
	title: "Core/Inputs/Text Field",
	component: TextField
}

const Template = (args: TextFieldProps) => <TextField id="text-field" label="Text Field" {...args}/>

export const Basic = Template.bind({});

export const Placeholder = Template.bind({});
Placeholder.args = {
	placeholder: "Text Field"
}
