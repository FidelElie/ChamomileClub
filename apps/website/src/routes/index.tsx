import { Flex, Image, Main, Video, Heading, Copy, Box, Link } from "~/components/core";

const Home = () => {
  return (
    <Main title="The Chamomile Club | Texas Hold'em Redefined">
      <Flex
        class="h-screen border-b-1 border-b-cream shadow-xl relative"
        align="center"
        justify="center"
      >
        <Box class="relative w-2/3 md:w-1/3">
          <Image
            src="./images/primary-logo.png"
            alt="Chamomile Club Logo"
            class="select-none"
          />
        </Box>
      </Flex>
      <Flex
        class="h-screen bg-cream"
      >
        <Flex direction="col" class="w-1/3 flex-shrink-0">
          <Video
            src="/videos/landing.mp4"
            fit="cover"
            class="w-full shadow-2xl"
            overlay="bg-black bg-opacity-75"
            autoplay
            muted
            loop
          />
          <Box class="bg-green flex-grow relative">
            <Box class="absolute bg-black left-0 top-0 w-full h-full bg-opacity-50 z-0" />
            <Flex direction="col" align="center" justify="center" class="h-full">
              <Box class="w-4/5 z-10 space-y-4">
                <Heading class="text-yellow text-4xl tracking-tighter">
                  Welcome to the Chamomile Club
                </Heading>
                <Copy class="text-white tracking-tight">
                  Taking poker to the next level. The invite only club has enjoyed many nights of casino chips, food and laughter.
                </Copy>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex align="center" justify="center">
          <Image
            src="./images/green-logo.png"
            alt="Green Logo"
            class="w-1/2"
          />
        </Flex>
      </Flex>
    </Main>
  );
}

export default Home;
