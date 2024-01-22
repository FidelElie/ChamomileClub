import { useState } from "react";

// ! Library
import { joinClasses } from "../../lib/utilities";

// ! Components
import { Paragraph } from "../core/Prose";

const CardSlideshow = (props) => {
  const { slideshowTitle, slides } = props;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentSlide = slides[currentSlideIndex];

  const previousSlide = () => {
    if (currentSlideIndex !== 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlideIndex !== slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-center space-x-3 my-3">
        {currentSlide.Cards.map((Card, index) => (
          <Card
            className="w-1/5 h-auto shadow-lg md:w-1/12"
            key={`${slideshowTitle}-card-${currentSlide}-${index}`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center my-2">
        <button
          className={joinClasses(
            "px-4 py-3 text-white bg-green-800  font-heading transition-opacity dark:bg-invertedLight",
            {
              "opacity-25 cursor-default": currentSlideIndex === 0,
            },
          )}
          onClick={previousSlide}
        >
          &lt;
        </button>
        <div className="mx-5 px-4 py-3 bg-green-800 dark:bg-invertedLight text-white font-heading text-center">
          {currentSlide.title}
        </div>
        <button
          className={joinClasses(
            "px-4 py-3 text-white bg-green-800 font-heading transition-opacity dark:bg-invertedLight",
            {
              "opacity-25 cursor-default": currentSlideIndex === slides.length - 1,
            },
          )}
          onClick={nextSlide}
        >
          &gt;
        </button>
      </div>
      <div className="text-center">
        <Paragraph>
          {currentSlideIndex + 1} : {currentSlide.description}
        </Paragraph>
      </div>
    </div>
  );
};

export default CardSlideshow;
