import { ReactNode } from "react";

import { joinClasses } from "../../../library/utilities";

interface PaperProps {
	children?: ReactNode
}

const Paper = (props: PaperProps) => {
	const { children } = props;

	return (
		<div className="Paper">
			{children}
		</div>
	)
}

export default Paper;
export type { PaperProps }
