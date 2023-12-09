import { useState } from "react";
import { MotiView } from "moti";

import { Copy, Flex, Heading, Show } from "@thechamomileclub/ui";

import { useAuth } from "@/library/providers";

import { LandingLayout } from "@/components/interfaces";

import { OnboardingFlow } from "@/components/screens/bridge/OnboardingFlow";

const OnboardingScreen = () => {
  const { user } = useAuth();
  const [initialAnimationEnded, setInitialAnimationEnded] = useState(false);

  const handleAnimationEnd = () => {
    setInitialAnimationEnded(true);
  };

  return (
    <LandingLayout>
      <Flex>
        <Flex className="flex-grow items-center pt-5">
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 500 }}
          >
            <Copy size="xl" className="mb-1.5">
              Welcome
            </Copy>
          </MotiView>
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 750 }}
            delay={750}
            onDidAnimate={handleAnimationEnd}
            className="items-center"
          >
            <Heading size="3xl" className="mb-1">
              {user?.forename} {user?.surname}
            </Heading>
            <Show if={user?.roles.length ? user.roles : null}>
              {(roles) => (
                <Copy className="uppercase" size="sm" color="yellow">
                  {roles.join(",")}
                </Copy>
              )}
            </Show>
          </MotiView>
          <MotiView
            animate={{ opacity: initialAnimationEnded ? 1 : 0 }}
            className="w-full py-5 flex-grow"
          >
            <OnboardingFlow user={user!} />
          </MotiView>
        </Flex>
      </Flex>
    </LandingLayout>
  );
};

export default OnboardingScreen;
