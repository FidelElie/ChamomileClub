import classnames from "classnames";

const TextField = (props: TextFieldProps) => {
	const {
		class: _class,
		id,
		label,
		name,
		ref,
		value,
		placeholder,
		onChange,
		disabled,
		type
	} = props;

	const dispatchOnChange = (value: string) => {
		if (onChange && !disabled) { onChange(value); }
	}

	return (
		<div
			class={classnames("flex bg-cream", _class)}
			aria-disabled={disabled}
		>
			<label class="sr-only" for={id}>{ label }</label>
			<input
				id={id}
				name={name}
				class="flex-grow p-2 font-copy uppercase font-light tracking-tighter"
				value={value || ""}
				aria-disabled={disabled}
				placeholder={placeholder}
				type={type}
				onChange={event => dispatchOnChange(event.currentTarget.value)}
				{...(ref ? { ref } : {})}
			/>
		</div>
	)
}

interface TextFieldProps {
	class?: string,
	id: string,
	label: string,
	value?: string,
	placeholder?: string,
	onChange?: (value: string) => void,
	name?: string,
	ref?: HTMLInputElement,
	disabled?: boolean,
	type?: "password" | "email" | "text"
}

export default TextField;
export type { TextFieldProps }
