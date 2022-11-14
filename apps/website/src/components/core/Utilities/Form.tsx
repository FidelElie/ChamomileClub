import { JSX } from "solid-js";

import classNames from "classnames";

const Form = (props: FormProps) => {
	const {
		class: _class,
		action,
		onSubmit,
		children
	} = props;

	const handleSubmission: JSX.DOMAttributes<HTMLFormElement>["onSubmit"] = (event) => {
		event.preventDefault();
		if (onSubmit) { onSubmit(); }
	}

	return (
		<form
			class={classNames(
				_class
			)}
			action={action}
			onSubmit={handleSubmission}
		>
			{ children }
		</form>
	)
}

interface FormProps {
	class?: string,
	action?: string,
	onSubmit?: () => void,
	children: JSX.Element
}

export default Form;
export type { FormProps }
