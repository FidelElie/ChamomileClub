import Image from "next/image";
import PropTypes from "prop-types";

// ! Assets
import ImagePlaceholder from "../../assets/images/image-placeholder.svg";

// ! Components
import { SubTitle, SubSubTitle, Paragraph } from "../core/Prose";

const ImageCard = (props) => {
  const { name, position, text, image } = props;

  return (
    <div className="flex flex-col md:flex-row md:space-x-5" key={name}>
      <div className="w-full h-96 rounded-md shadow-lg bg-white flex justify-center overflow-hidden relative md:w-1/3">
        {
          image && (
            <Image
              className="w-full h-full object-cover"
              layout="fill"
              src={image}
              alt={name}
            />
          )
        }
        <div className="w-full h-full flex items-center justify-center">
          <ImagePlaceholder className="w-32 h-auto text-gray-500"/>
        </div>
      </div>
      <div className="md:w-2/3">
        <SubTitle>{name}</SubTitle>
        <SubSubTitle>{position}</SubSubTitle>
        <Paragraph>{text}</Paragraph>
      </div>
    </div>
  )
}

ImageCard.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string
}

export default ImageCard;
