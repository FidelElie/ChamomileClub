import { ReactNode } from "react";

import { joinClasses } from "../../../library/utilities";

interface ContainerProps {
	children: ReactNode
}

const Container = (props: ContainerProps) => {
	const { children } = props;

	return (
		<div className="Container">
			{ children }
		</div>
	)
}

export default Container;
export type { ContainerProps }

// import PropTypes from "prop-types";
// import { joinClasses } from "../../../../lib/utilities";

// const Container = (props) => {
// 	const { className, maxWidth, alignVertical, alignHorizontal, children } = props;

// 	return (
// 		<div className={joinClasses("contiainer", {
// 			[className]: className,
// 			[`max-w-${maxWidth}`]: maxWidth,
// 			"mx-auto": alignHorizontal,
// 			"my-auto": alignVertical
// 		})}>
// 			{children}
// 		</div>
// 	)
// }

// Container.propTypes = {
// 	className: PropTypes.string,
// 	maxWidth: PropTypes.string,
// 	alignVertical: PropTypes.bool,
// 	alignHorizontal: PropTypes.bool,
// 	children: PropTypes.node.isRequired
// }

// Container.defaultProps = {
// 	alignVertical: false,
// 	alignHorizontal: false
// }

// export default Container;

