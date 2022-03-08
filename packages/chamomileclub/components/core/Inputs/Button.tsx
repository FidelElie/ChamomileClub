import { MouseEvent, MouseEventHandler, ReactNode } from "react";

import { joinClasses } from "../../../library/utilities";

interface ButtonProps {
	className?: string,
	label?: string,
	type?: "button" | "submit" | "reset",
	onClick?: Function,
	disabled?: boolean,
	children?: ReactNode,
}

const Button = (props: ButtonProps) => {
	const {
		className,
		label,
		type = "button",
		onClick,
		disabled,
		children
	} = props;

	const dispatchOnClick: MouseEventHandler<HTMLButtonElement> = (event: MouseEvent) => {
		if (!disabled && onClick) { onClick(event); }
	}

	return (
		<button
			className={joinClasses("Button", {
				[className]: className
			})}
			type={type}
			onClick={dispatchOnClick}
			disabled={disabled}
		>
			{ label }
			{ children }
		</button>
	)
}

export default Button;
export type { ButtonProps };
