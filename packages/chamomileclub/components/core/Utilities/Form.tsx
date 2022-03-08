import { ReactNode, FormEventHandler, FormEvent } from "react";

import { joinClasses } from "../../../library/utilities";

interface FormProps {
	onSubmit: Function,
	disabled: Boolean,
	children: ReactNode
}

const Form = (props: FormProps) => {
	const {
		onSubmit,
		disabled,
		children
	} = props;

	const dispatchOnSubmit: FormEventHandler<HTMLFormElement> = (event: FormEvent) => {
		event.preventDefault();
		if (!disabled && onSubmit) { onSubmit(event) }
	}

	return (
		<form
			onSubmit={dispatchOnSubmit}
			className={joinClasses()}
		>
			{ children }
		</form>

	)
}

export default Form;
export type { FormProps };
