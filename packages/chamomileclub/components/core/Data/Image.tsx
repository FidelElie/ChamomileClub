import NextImage from "next/image";

import { joinClasses } from "../../../library/utilities";

interface ImageProps {
	src: string,
	className?: string,
	fit?: "fill" | "contain" | "cover" | "none" | "scale-down",
	loading?: "lazy" | "eager",
	onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number; }) => void,
	unoptimized: boolean
}

const Image = (props: ImageProps) => {
	const {
		className,
		src,
		fit,
		loading,
		onLoadingComplete,
		unoptimized
	} = props;

	return (
		<NextImage
			className={joinClasses("Image", {
				[className]: className
			})}
			src={src}
			objectFit={fit}
			loading={loading}
			onLoadingComplete={onLoadingComplete}
			unoptimized={unoptimized}
			placeholder="blur"
			layout="fill"
		/>
	)
}

export default Image;
export type { ImageProps }
