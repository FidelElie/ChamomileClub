import Link from "next/link";
import PropTypes from "prop-types";
import { joinClasses } from "../../../../lib/utilities";

const LinkButton = (props) => {
	const { href, as, text, className, children } = props;

	return (
		<Link href={href} as={as}>
			<a className={joinClasses("w-min whitespace-nowrap font-light hover:underline", {
				[className]: className
			})}>
				{ text }
				{ children }
			</a>
		</Link>
	)
}

LinkButton.propTypes = {
	href: PropTypes.string.isRequired,
	as: PropTypes.string,
	text: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node
}

export default LinkButton;
