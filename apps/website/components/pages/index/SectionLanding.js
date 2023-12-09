// ! Assets
import LoaderIcon from "../../../assets/images/loader.svg";
import ArrowDownIcon from "../../../assets/images/arrow-down.svg";

//! Library
import useMedia from "../../../lib/hooks/useMedia";
import { joinClasses } from "../../../lib/utilities";

const LandingSection = (props) => {
  const { aboutSection } = props;
  const {
    mediaRef,
    mediaLoaded,
    mediaLoading,
    mediaError
  } = useMedia("./videos/landing-video.mp4");

  const scrollToAbout = () => {
    if (aboutSection.current) {
      aboutSection.current.scrollIntoView({ behavior: "smooth" });
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
        <div className={joinClasses("w-full h-full flex-col flex justify-center items-center bg-black bg-opacity-50 z-10 transition-opacity duration-300 delay-300 lg:flex-col", {
          "opacity-0": mediaLoading,
          "opacity-100": !mediaLoading
        })}>
          <div className="container mx-auto flex-grow flex flex-col justify-center px-5 text-center md:max-w-xl lg:max-w-5xl z-10 lg:px-10">
            <h1 className="text-red-600 text-5xl tracking-tigher font-medium mb-1 font-heading md:text-7xl lg:text-8xl">
              Texas Hold&apos;em
            </h1>
            <h2 className="text-3xl text-white mb-3 font-light md:text-5xl">
              redefined for the
            </h2>
            <h2 className="text-white text-4xl uppercase font-light font-heading md:text-5xl lg:text-6xl">
              London Massive
            </h2>
            <div className="w-full pt-10">
                <ArrowDownIcon
                  className="h-4 w-4 text-white mx-auto cursor-pointer md:h-6 md:w-6"
                  onClick={scrollToAbout}
                />
            </div>
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
