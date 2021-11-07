import PropTypes from "prop-types";
import { joinClasses } from "../../../../lib/utilities";

const Input = (props) => {
	const {
		id,
		type,
		placeholder,
		autoComplete,
		label,
		onChange,
		value,
		showLabel
	} = props;

	return (
		<div className="flex flex-col w-full">
			<label
				htmlFor={id}
				className={joinClasses("", {
					"sr-only": !showLabel
				})}
			>
				{ label || placeholder || id }
			</label>
			<input
				id={id}
				name={id}
				type={type}
				placeholder={placeholder || id}
				autoComplete={autoComplete}
				value={value}
				onChange={onChange}
				className="flex-grow box-border px-5 py-3 focus:outline-none shadow rounded-md border-gray-200"
			/>
		</div>
	)
}

Input.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.oneOf(["text", "number", "email", "password"]),
	placeholder: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	autoComplete: PropTypes.string,
	showLabel: PropTypes.bool
}

Input.defaultProps = {
	type: "text",
	showLabel: false
}

export default Input;
