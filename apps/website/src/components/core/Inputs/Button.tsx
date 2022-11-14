import { JSX } from "solid-js/web/types/jsx";

import classNames from "classnames";

const Button = (props: ButtonProps) => {
	const {
		class: _class,
		onClick,
		type,
		disabled,
		children
	} = props;

	return (
		<button
			class={classNames("font-copy uppercase", _class)}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{ children }
		</button>
	)
}

const SubmitButton = (props: Omit<ButtonProps, "type">) => <Button {...props} type="submit"/>;

interface ButtonProps {
	class?: string,
	type?: "button" | "submit",
	onClick?: JSX.EventHandler<HTMLButtonElement, Event>,
	disabled?: boolean,
	children: JSX.Element
}

Button.Submit = SubmitButton;

export default Button;
export type { ButtonProps }
