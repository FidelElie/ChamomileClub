import { JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

import classNames from "classnames";

const Copy = (props: CopyProps) => {
	const {
		class: _class,
		as = "p",
		children
	} = props;

	return (
		<Dynamic
			component={as}
			class={classNames(
				"font-copy uppercase tracking-tighter",
				_class
			)}
		>
			{ children }
		</Dynamic>
	)
}

interface CopyProps {
	class?: string,
	as?: "p" | "span" | "b" | "i",
	children: JSX.Element
}

export default Copy;
export type { CopyProps }
