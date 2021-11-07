import PropTypes from "prop-types";
import { joinClasses } from "../../../../lib/utilities";

const FormRow = (props) => {
	const { spacing, className, responsive, children } = props;

	return (
		<div className={joinClasses("flex items-center", {
			[className]: className,
			[`space-x-${spacing}`]: spacing,
			[responsive]: responsive
		})}>
			{ children }
		</div>
	)
}

FormRow.propTypes = {
	spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
	children: PropTypes.node.isRequired
}

FormRow.defaultProps = {
	spacing: 3
}

export default FormRow;
