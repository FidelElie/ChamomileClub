import { ReactNode, useRef } from "react";
import { View, Image } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { StatusBar } from "expo-status-bar";

import LandingVideo from "@/assets/landing-video.mp4";
import OrangeLogo from "@/assets/logos/orange-logo.png";

export const LandingLayout = (props: LandingLayoutProps) => {
	const { children } = props;

	const videoRef = useRef(null);

	return (
		<View className="w-full h-full justify-center items-center relative">
			<StatusBar style="light" animated translucent />
			<View className="w-full h-full">
				<Video
					ref={videoRef}
					className="w-full h-full"
					source={LandingVideo}
					resizeMode={ResizeMode.COVER}
					shouldPlay
					isLooping
				/>
				<View className="absolute w-full h-full bg-black opacity-90" />
			</View>
			<View className="absolute top-0 justify-center pt-14">
				<Image
					source={OrangeLogo}
					className="h-14 -left-1.5"
					alt="Logo"
					resizeMode={ResizeMode.CONTAIN}
				/>
			</View>
			<View className="absolute w-4/5 justify-center">
				{ children }
			</View>
		</View>
	)
}

export interface LandingLayoutProps {
	children: ReactNode;
}
