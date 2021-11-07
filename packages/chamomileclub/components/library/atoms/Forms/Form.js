import PropTypes from "prop-types";
import { joinClasses } from "../../../../lib/utilities";

const Form = (props) => {
	const { onSubmit, spacing, className, children } = props;

	return (
		<form
			className={joinClasses("w-full", {
				[className]: className,
				[`space-y-${spacing}`]: spacing
			})}
			onSubmit={(event) => {
				event.preventDefault();
				if (!onSubmit) {
					return console.warn("onSubmit has not been added to Form")
				}
				onSubmit();
			}}
		>
			{ children }
		</form>
	)
}

Form.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
	children: PropTypes.node.isRequired
}

Form.defaultProps = {
	spacing: 5
}

export default Form;
