import PropTypes from "prop-types";
import { joinClasses } from "../../../../lib/utilities";

const Button = (props) => {
	const { type, level, onClick, text } = props;

	return (
		<button
			type={type}
			className={joinClasses("px-5 py-3 w-min whitespace-nowrap shadow rounded-md", {
				"text-white bg-green-900 dark:bg-invertedDark": level === "primary",
				"text-white bg-primary dark:bg-inverted": level === "secondary"
			})}
			onClick={onClick}
		>
			{ text }
		</button>
	)
}

Button.propTypes = {
	type: PropTypes.string,
	level: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
	onClick: PropTypes.func,
	text: PropTypes.string
}

Button.defaultProps = {
	type: "button",
	onClick: () => {}
}

export default Button;
