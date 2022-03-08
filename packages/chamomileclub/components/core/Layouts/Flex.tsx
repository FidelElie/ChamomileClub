import { ReactNode } from "react";

import { joinClasses } from "../../../library/utilities";

interface FlexProps {
	children: ReactNode
}

const Flex = (props: FlexProps) => {
	const { children } = props;

	return (
		<div className="Flex">
			{ children }
		</div>
	)
}

export default Flex;
export type { FlexProps }


// import PropTypes from "prop-types";
// import { joinClasses } from "../../../../lib/utilities";

// const Flex = (props) => {
// 	const {
// 		col,
// 		wrap,
// 		wrapReverse,
// 		className,
// 		align,
// 		justify,
// 		children
// 	} = props;

// 	return (
// 		<div className={joinClasses("flex", {
// 			[`items-${align}`]: align,
// 			[`justify-${justify}`]: justify,
// 			"flex-col": col,
// 			"flex-wrap": wrap,
// 			"flex-wrap-reverse": wrapReverse,
// 			[className]: className
// 		})}>
// 			{children}
// 		</div>
// 	)
// }

// Flex.propTypes = {
// 	className: PropTypes.string,
// 	col: PropTypes.bool,
// 	wrap: PropTypes.bool,
// 	wrapReverse: PropTypes.bool,
// 	align: PropTypes.string,
// 	justify: PropTypes.string,
// 	children: PropTypes.node.isRequired
// }

// Flex.defaultProps = {
// 	col: false,
// 	wrap: false,
// 	wrapReverse: false
// }

// export default Flex;
