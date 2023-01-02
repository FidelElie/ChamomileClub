// ! Next and React
import Link from "next/link";

// ! Assets
import LoaderIcon from "../../../assets/images/loader.svg";
import PlaceHolderIcon from "../../../assets/images/image.svg";

// ! Library
import useMedia from "../../../lib/hooks/useMedia";
import { joinClasses } from "../../../lib/utilities";

const JobDisplay = (props) => {
	const { opening } = props;
	const {
		mediaRef,
		mediaLoading,
		mediaError,
		noMediaPresent
	} = useMedia(opening.image)

	return (
		<Link href={`/jobs/${opening._id}`}>
			<a className="px-0 py-5 flex flex-col box-border w-full group md:w-1/2 md:p-5">
				<span className="flex flex-col shadow-lg relative bg-green-900  dark:bg-invertedDark">
					<span className="block w-full h-64 relative">
						{ (mediaError || noMediaPresent) && <NoImagePlaceholder/> }
						{ mediaLoading && <ImageLoading/> }
						{
							!mediaError && (
								<img
									className={joinClasses("transition-opacity w-full h-full object-cover absolute top-0 left-0 z-0 duration-500", {
										"opacity-0": mediaLoading,
										"opacity-100": !mediaLoading,
									})}
									ref={mediaRef}
									alt={opening.name}
								/>
							)
						}
						{
							(!mediaLoading && !mediaError) && (
								<span className="flex items-center h-full p-5 box-border absolute transition-opacity bg-black bg-opacity-0 group-hover:bg-opacity-75">
									<span className="text-white text-lg transition-opacity opacity-0 group-hover:opacity-100">{ opening.description }</span>
								</span>
							)
						}
					</span>
					<span className="flex justify-between items-center px-4 py-3">
						<span className="text-xl text-white font-medium">
							{opening.name}
						</span>
						<span className="text-white text-sm opacity-0 transition-opacity group-hover:opacity-100">
							More
						</span>
				</span>
				</span>
			</a>
		</Link>
	)
}

const ImageLoading = () => (
	<div className="w-full h-full flex items-center justify-center bg-white">
		<LoaderIcon className="w-24 h-auto animate-spin text-gray-500" />
	</div>
)

const NoImagePlaceholder = () => {
	<div className="w-full h-full flex items-center justify-center bg-white">
		<PlaceHolderIcon className="w-32 h-auto text-gray-500" />
	</div>
}

export default JobDisplay;
