import PropTypes from "prop-types";
import { joinClasses } from "../../../../lib/utilities";

const FormGroup = (props) => {
	const { spacing, children } = props;

	return (
		<div className={joinClasses({
			[`space-y-${spacing}`]: spacing,
		})}>
			{ children }
		</div>
	)
}

FormGroup.propTypes = {
	spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	children: PropTypes.node.isRequired
}

FormGroup.defaultProps = {
	spacing: 4
}

export default FormGroup;
