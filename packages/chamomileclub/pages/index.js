import { useRef } from "react";

// ! Data
import features from "../assets/data/features";

// ! Components
import AppLayout from "../components/layouts/App";
import { Paragraph, SubTitle } from "../components/core/Prose";
import EmailForm from "../components/pages/Email.form";

export default function Home() {
  const featuresSection = useRef();

  const scrollToFeature = () => {
    featuresSection.current.scrollIntoView({
      behavior: "smooth"
    })
  }

  return (
    <AppLayout>
      <div className="w-full h-screen flex flex-col py-10 box-border relative">
        <div className="w-full h-full absolute top-0 left-0 z-0 shadow">
          <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0" />
          <video
            loop
            className="w-full h-full object-cover"
            autoPlay
          >
            <source src="./videos/landing-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container mx-auto flex-grow flex flex-col justify-center px-5 md:max-w-xl lg:max-w-5xl z-10 lg:px-10">
          <h1 className="text-red-600 text-5xl tracking-tigher font-medium mb-1 md:text-7xl lg:text-8xl">
            Texas Hold'em
          </h1>
          <h2 className="text-3xl text-white mb-3 font-light md:text-5xl">
            redefined for the
          </h2>
          <h2 className="text-white text-4xl uppercase font-light md:text-5xl lg:text-6xl">
            London Massive
          </h2>
        </div>
        <div className="absolute transform text-center bottom-20 w-full z-10">
          <h2 className="font-semibold text-lg text-white mb-1 md:text-2xl">
            Invitation Only
          </h2>
          <h3 className="font-extralight text-white md:text-lg">
            Dates To Be Confirmed
          </h3>
          <button
            onClick={scrollToFeature}
            className="px-5 py-3 w-min box-border whitespace-nowrap text-white mt-5 rounded-md shadow font-semibold bg-primary dark:bg-inverted"
          >
            Learn More
          </button>
        </div>
      </div>
      <div
        className="w-full bg-green-800 dark:bg-invertedLight shadow"
        ref={featuresSection}
      >
        <div className="w-full container max-w-xl mx-auto py-20 px-8 md:px-0">
          <div className="flex flex-col space-y-5 md:space-y-8">
            {
              features.map((feature, index) => (
                <div className="flex items-center space-x-4" key={`$Feature-${index}`}>
                  <feature.Chip className="h-auto rounded-full shadow-lg w-1/5"/>
                  <div className="space-y-2 w-4/5">
                    <SubTitle>{ feature.title }</SubTitle>
                    <Paragraph>{ feature.description }</Paragraph>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="w-full py-20 shadow md:py-32 lg:py-52">
        <div className="mx-auto container flex flex-col px-8 items-center md:space-x-8 md:max-w-3xl md:px-12 md:flex-row lg:max-w-6xl">
            <div className="flex flex-col flex-grow mb-5 w-full md:w-1/2 md:mb-0">
              <span className="text-secondary text-4xl tracking-tighter font-semibold mb-2 md:text-5xl lg:text-6xl">Interested In The Movement?</span>
              <span className="text-2xl text-white tracking-tighter font-light">Sign up below to get updates as well as know when we go public.</span>
            </div>
            <EmailForm/>
          </div>
      </div>
    </AppLayout>
  )
}
