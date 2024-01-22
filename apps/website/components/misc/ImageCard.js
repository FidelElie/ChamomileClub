/* eslint @next/next/no-img-element: 0 */
import PropTypes from "prop-types";

// ! Assets
import LoaderIcon from "../../assets/images/loader.svg";
import PlaceHolderIcon from "../../assets/images/user.svg";

// ! Library
import useMedia from "../../lib/hooks/useMedia";
import { joinClasses } from "../../lib/utilities";

// ! Components
import { Paragraph, SubSubTitle, SubTitle } from "../core/Prose";

const ImageCard = (props) => {
  const { name, position, text, image } = props;
  const { mediaRef, mediaLoading, mediaError, noMediaPresent } = useMedia(image);

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-5" key={name}>
      <div className="w-full h-96 rounded-md shadow-lg bg-white flex justify-center overflow-hidden relative sm:w-1/3">
        <div className="w-full h-full z-10">
          {(mediaError || noMediaPresent) && <NoImagePlaceholder />}
          {mediaLoading && <ImageLoading />}
        </div>
        {!mediaError && (
          <img
            className={joinClasses(
              "transition-opacity w-full h-full object-cover absolute top-0 left-0 z-0 duration-500",
              {
                "opacity-0": mediaLoading,
                "opacity-100": !mediaLoading,
              },
            )}
            ref={mediaRef}
            alt={name}
          />
        )}
      </div>
      <div className="sm:w-2/3">
        <SubTitle>{name}</SubTitle>
        <SubSubTitle>{position}</SubSubTitle>
        <Paragraph>{text}</Paragraph>
      </div>
    </div>
  );
};

const ImageLoading = () => (
  <div className="w-full h-full flex items-center justify-center bg-white">
    <LoaderIcon className="w-24 h-auto animate-spin text-gray-500" />
  </div>
);

const NoImagePlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center bg-white">
    <PlaceHolderIcon className="w-32 h-auto text-gray-500" />
  </div>
);

ImageCard.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
};

export default ImageCard;
