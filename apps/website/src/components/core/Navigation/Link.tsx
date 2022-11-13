import { A } from "solid-start";
import type { ComponentProps, JSX } from "solid-js";

const Link = (props: LinkProps) => {
	const {
		class: _class,
		children,
		...linkProps
	} = props;

	return (
		<A {...linkProps} class={_class}>
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
