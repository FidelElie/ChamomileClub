import PropTypes from "prop-types";
import { joinClasses } from "../../../lib/utilities";

const TYPE_ELEMENTS = ["h1", "h2", "h3", "p", "span"];

const TYPE_MAPS = {
	h1: { size: "text-4xl" },
	h2: { size: "text-2xl" },
	h3: { size: "text-lg" },
	p: { size: "text-base" },
	span: { size: "text-base" }
}

const Typography = (props) => {
	const {
		element,
		as,
		bold,
		underline,
		italic,
		size,
		family,
		text,
		className,
		children
	} = props;

	const TypeElement = element;
	const typeMap = TYPE_MAPS[element || as];

	return (
		<TypeElement
			className={joinClasses({
				[className]: className,
				[as]: as,
				[size]: size,
				[typeMap.size]: typeMap.size && !size,
				"bold": bold,
				"italic": italic,
				"underline": underline,
				"font-heading": family === "heading"
			})}
		>
			{ text }
			{ children }
		</TypeElement>
	)
}

Typography.propTypes = {
	element: PropTypes.oneOf(TYPE_ELEMENTS),
	as: PropTypes.oneOf(TYPE_ELEMENTS),
	bold: PropTypes.bool,
	underline: PropTypes.bool,
	italic: PropTypes.bool,
	size: PropTypes.string,
	family: PropTypes.string,
	text: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node
}

Typography.defaultProps = {
	element: "p",
	bold: false,
	underline: false,
	italic: false
}

export default Typography;
