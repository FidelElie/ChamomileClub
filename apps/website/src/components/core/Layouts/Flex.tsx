import type { ComponentProps, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

import classNames from "classnames";

const ALIGN_ITEMS = {
	center: "items-center",
	start: "items-start",
	end: "items-end",
	between: "items-between",
	evenly: "items-evenly"
}

const JUSTIFY_CONTENT = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between",
	evenly: "justify-evenly"
}

const FlEX_DIRECTIONS = {
	row: "flex-row",
	col: "flex-col",
	"row-reverse": "flex-row-reverse",
	"col-reverse": "flex-col-reverse"
}

const Flex = (props: FlexProps) => {
	const {
		class: _class,
		as = "div",
		align,
		justify,
		direction = "row",
		children
	} = props;

	return (
		<Dynamic component={as} class={classNames(
			"flex",
			align && ALIGN_ITEMS[align],
			justify && JUSTIFY_CONTENT[justify],
			direction && FlEX_DIRECTIONS[direction],
			_class
		)}>
			{ children }
		</Dynamic>
	)
}

interface FlexProps {
	class?: string,
	as?:	ComponentProps<typeof Dynamic>["component"],
	direction?: keyof typeof FlEX_DIRECTIONS,
	align?: keyof typeof ALIGN_ITEMS,
	justify?: keyof typeof JUSTIFY_CONTENT,
	children: JSX.Element
}

export default Flex;
export type { FlexProps }
