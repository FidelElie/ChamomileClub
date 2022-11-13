import { JSX } from "solid-js";

import classNames from "classnames";

const Form = (props: FormProps) => {
	const {
		class: _class,
		action,
		onSubmit,
		children
	} = props;

	return (
		<form
			class={classNames(
				_class
			)}
			action={action}
			onSubmit={onSubmit}
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
