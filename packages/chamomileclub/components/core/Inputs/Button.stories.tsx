import Button, { type ButtonProps} from "./Button";

export default {
	title: "Core/Inputs/Button",
	component: Button
}

const Template = (args: ButtonProps) => <Button label="Button" {...args}/>

export const Basic = Template.bind({});
Basic.args = {
	label: "Button"
}
