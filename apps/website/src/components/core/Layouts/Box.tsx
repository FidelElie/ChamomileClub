import type { ComponentProps, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

import classNames from "classnames";

const Box = (props: BoxProps) => {
	const {
		class: _class,
		as = "div",
		children
	} = props;

	return (
		<Dynamic component={as} class={classNames(
			_class
		)}>
			{children}
		</Dynamic>
	)
}

interface BoxProps {
	class?: string,
	as?: ComponentProps<typeof Dynamic>["component"],
	children?: JSX.Element
}

export default Box;
export type { BoxProps }
