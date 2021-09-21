// ! Assets
import LoaderIcon from "../../../assets/images/loader.svg";

//! Library
import useMedia from "../../../lib/hooks/useMedia";
import { joinClasses } from "../../../lib/utilities";

const LandingSection = (props) => {
  const { featuresSection } = props;
  const {
    mediaRef,
    mediaLoaded,
    mediaLoading,
    mediaError
  } = useMedia("./videos/landing-video.mp4");

  const scrollToFeature = () => {
    if (featuresSection.current) {
      featuresSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
      <div className="w-full h-screen flex flex-col box-border relative">
        <div className="w-full h-full absolute top-0 left-0 z-0 shadow">
            {
              !mediaError && (
                <video
                  loop
                  muted
                  autoPlay
                  ref={mediaRef}
                  className={
                    joinClasses("w-full h-full object-cover transition-opacity absolute top-0 left-0 duration-300", {
                    "opacity-0": !mediaLoaded,
                    "opacity-100": mediaLoaded
                  })}
                />
              )
            }
            { mediaLoading && <VideoLoading mediaLoading={mediaLoading}/> }
        </div>
        <div className={joinClasses("w-full h-full flex-col flex justify-center items-center bg-black bg-opacity-50 z-10 transition-opacity duration-300 delay-300 sm:flex-row md:flex-col", {
          "opacity-0": mediaLoading,
          "opacity-100": !mediaLoading
        })}>
          <div className="container mx-auto flex-grow flex flex-col justify-center px-5 text-center md:text-left md:max-w-xl lg:max-w-5xl z-10 lg:px-10">
            <h1 className="text-red-600 text-5xl tracking-tigher font-medium mb-1 font-heading md:text-7xl lg:text-8xl">
              Texas Hold'em
            </h1>
            <h2 className="text-3xl text-white mb-3 font-light md:text-5xl">
              redefined for the
            </h2>
            <h2 className="text-white text-4xl uppercase font-light font-heading md:text-5xl lg:text-6xl">
              London Massive
            </h2>
          </div>
          <div className="absolute sm:static md:absolute transform text-center bottom-16 w-full z-10 md:pb-0">
            <h2 className="font-semibold text-xl text-white mb-1 font-heading tracking-widest uppercase md:text-2xl">
              Invitation Only
            </h2>
            <h3 className="font-light text-white md:text-lg">
              Dates To Be Confirmed
            </h3>
            <button
              onClick={scrollToFeature}
              className="px-5 py-3 w-min box-border whitespace-nowrap text-white mt-5 shadow font-semibold bg-primary dark:bg-inverted"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
  )
}

const VideoLoading = ({ mediaLoading }) => (
  <div className={joinClasses("w-full h-full flex items-center justify-center", {
    "opacity-0": !mediaLoading,
    "opacity-100": mediaLoading
  })}>
    <LoaderIcon className="w-32 h-auto animate-spin text-white"/>
  </div>
)

export default LandingSection;
