import PropTypes from "prop-types";
import { joinClasses } from "../../../../lib/utilities";

const Image = (props) => {
	const { src, className, fit } = props;

	return (
		<img
			src={src}
			className={joinClasses({
				[className]: className,
				[`object-${fit}`]: fit
			})}
		/>
	)
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	className: PropTypes.string,
	fit: PropTypes.string,
}

Image.defaultProps = {
	fit: "cover"
}

export default Image;
