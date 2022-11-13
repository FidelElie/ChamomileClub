import type { ComponentProps, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

const Container = (props: ContainerProps) => {
	const {
		class: _class,
		as = "div",
		children
	} = props;

	return (
		<Dynamic component={as} class={_class}>
			{ children }
		</Dynamic>
	)
}

interface ContainerProps {
	class?: string,
	as?: ComponentProps<typeof Dynamic>["component"],
	children: JSX.Element
}

export default Container;
export type { ContainerProps }
