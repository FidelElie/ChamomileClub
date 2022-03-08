import { ReactNode } from "react";

import { joinClasses } from "../../../library/utilities";

interface BoxProps {
	children?: ReactNode
}

const Box = (props: BoxProps) => {
	const { children } = props;

	return (
		<div className="Box">
			{children}
		</div>
	)
}

export default Box;
export type { BoxProps }

// import PropTypes from "prop-types";
// import { joinClasses } from "../../../../lib/utilities";

// const Box = (props) => {
// 	const { className, opacity, background, children } = props;

// 	return (
// 		<div className={joinClasses({
// 			[className]: className,
// 			[opacity]: opacity,
// 			[`bg-${background.color}`]: background.color,
// 			[`bg-opacity-${background.opacity}`]: background.opacity,
// 		})}>
// 			{children}
// 		</div>
// 	)
// }

// Box.propTypes = {
// 	className: PropTypes.string,
// 	color: PropTypes.string,
// 	background: PropTypes.object,
// 	children: PropTypes.node
// }

// Box.defaultProps = {
// 	background: {}
// }

// export default Box;
