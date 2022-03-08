import { ReactNode } from "react";

import { joinClasses } from "../../../library/utilities";

interface TypographyProps {
	className?: string,
	children: ReactNode
}

const Typography = (props: TypographyProps) => {
	const {
		className,
		children
	} = props;

	return (
		<p
			className={joinClasses("Typography", {
				[className]: className
			})}
		>
			{ children }
		</p>
	)
}

export default Typography;
export type { TypographyProps }
