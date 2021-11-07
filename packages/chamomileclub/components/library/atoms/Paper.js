import PropTypes from "prop-types";
import { joinClasses } from "../../../lib/utilities";

const Paper = (props) => {
	const { container, flex, className, children } = props;

	return (
		<div className={joinClasses("rounded-md bg-white shadow overflow-hidden", {
			"container mx-auto": container,
			"flex": flex,
			[className]: className
		})}>
			{ children }
		</div>
	)
}

Paper.propTypes = {
	className: PropTypes.string,
	flex: PropTypes.bool,
	container: PropTypes.bool,
	children: PropTypes.node.isRequired
}

Paper.defaultProps = {
	flex: false,
	container: false
}

export default Paper;
