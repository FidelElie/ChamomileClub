import { A } from "solid-start";
import type { ComponentProps, JSX } from "solid-js";

import classNames from "classnames";

const Link = (props: LinkProps) => {
	const {
		class: _class,
		children,
		...linkProps
	} = props;

	return (
		<A
			class={classNames(
				"text-cream",
				 _class
			)}
			{...linkProps}
		>
			{ children }
		</A>
	)
}

interface LinkProps extends ComponentProps<typeof A> {
	class?: string,
	children: JSX.Element
}

export default Link;
export type { LinkProps }
