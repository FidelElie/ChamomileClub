import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { joinClasses } from "../../../library/utilities";

interface IconProps {
	className?: string,
	icon: any
}

const Icon = (props: IconProps) => {
	const {
		className,
		icon
	} = props;

	return (
		<FontAwesomeIcon
			className={joinClasses({
				[className]: className
			})}
			icon={icon}
		/>
	)
}

export default Icon;
export type { IconProps }
