import classNames from "classnames";

const OBJECT_FITS = {
	contain: "object-contain",
	cover: "object-cover",
	fill: "object-fill",
	none: "object-none",
	"scale-down": "object-scale-down"
}

const Image = (props: ImageProps) => {
	const {
		class: _class,
		src,
		alt,
		fit
	} = props;

	return (
		<img
			src={src}
			alt={alt}
			class={classNames(
				fit && OBJECT_FITS[fit],
				_class
			)}
		/>
	)
}

interface ImageProps {
	class?: string,
	src: string,
	alt: string,
	fit?: keyof typeof OBJECT_FITS
}

export default Image;
export type { ImageProps }
