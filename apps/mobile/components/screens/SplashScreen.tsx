import { ResizeMode } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { AnimatePresence, MotiView } from "moti";
import type { ReactNode } from "react";
import { Image } from "react-native";

import { Flex } from "@thechamomileclub/ui";

import { YellowAltLogo } from "@/assets";

export const SplashScreen = (props: SplashScreenProps) => {
  const { show, children } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <Flex className="bg-green h-full w-full absolute top-0 left-0 justify-center items-center">
          <StatusBar hidden />
          <MotiView
            from={{ opacity: 1 }}
            animate={{ opacity: 0.75 }}
            transition={{ type: "timing", loop: true, duration: 1000 }}
          >
            <Image
              source={YellowAltLogo}
              className="h-40 -left-1.5"
              alt="Logo"
              resizeMode={ResizeMode.CONTAIN}
            />
          </MotiView>
          {children}
        </Flex>
      )}
    </AnimatePresence>
  );
};

export interface SplashScreenProps {
  show: boolean;
  children?: ReactNode;
}
