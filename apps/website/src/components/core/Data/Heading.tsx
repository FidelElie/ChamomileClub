import type { JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

import classNames from "classnames";

const Heading = (props: HeadingProps) => {
	const {
		class: _class,
		level = 1,
		children
	} = props;

	const headingTag = `h${level}` ;

	return (
		<Dynamic
			component={headingTag}
			class={classNames(
				"font-heading uppercase",
				_class
			)}
		>
			{ children }
		</Dynamic>
	)
}

interface HeadingProps {
	class?: string,
	level?: 1 | 2 | 3 | 4,
	children: JSX.Element
}

export default Heading;
export type { HeadingProps }
