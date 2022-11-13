import { Flex, Image, Main, Video, Button } from "~/components/core";

import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid-mini";

const Home = () => {
  let divRef: HTMLDivElement;

  return (
    <Main title="The Chamomile Club | Texas Hold'em Redefined">
      <Flex
        class="h-screen border-b-1 border-b-cream shadow-xl relative"
        align="center"
        justify="center"
      >
        <Image
          src="./images/primary-logo.png"
          alt="Chamomile Club Logo"
          class="w-2/3 select-none md:w-1/3"
        />
        <Button
          class="absolute bottom-5 left-1/2 transform -translate-x-1/2"
          onClick={() => divRef.scrollIntoView({ behavior: "smooth" })}
        >
          <Icon path={chevronDown} class="text-cream w-8 h-8"/>
        </Button>
      </Flex>
      <Video
        src="/videos/landing.mp4"
        fit="cover"
        ref={divRef!}
        class="h-96 w-full shadow"
        overlay="bg-black bg-opacity-90"
        autoplay
        muted
        loop
      />
    </Main>
  );
}

export default Home;
