import { ReactNode, useRef } from "react";
import { View, Image } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

import { Show } from "@thechamomileclub/ui";

import LandingVideo from "@/assets/videos/landing-video.mp4";
import OrangeLogo from "@/assets/logos/orange-logo.png";

const DEFAULT_LOGO_OPTIONS: Required<LandingLayoutProps["logo"]> = {
	flow: false
}

export const LandingLayout = (props: LandingLayoutProps) => {
	const { className, logo, children } = props;

	const mergedLogoOptions = Object.assign({}, DEFAULT_LOGO_OPTIONS, logo);

	const videoRef = useRef(null);

	return (
		<View className="w-full h-full items-center relative">
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
				<View className="absolute w-full h-full bg-midnight opacity-90" />
			</View>
			<Show if={!mergedLogoOptions.flow}>
				<SafeAreaView className="absolute top-0">
					<LandingLogo/>
				</SafeAreaView>
			</Show>
			<SafeAreaView className={twMerge("absolute w-4/5 h-full justify-center", className)}>
				<Show if={mergedLogoOptions.flow}>
					<LandingLogo />
				</Show>
				{children}
			</SafeAreaView>
		</View>
	)
}

const LandingLogo = ({ className }: { className?: string }) => (
	<View className="justify-center items-center">
		<Image
			source={OrangeLogo}
			className={twMerge("h-20 -left-1.5", className)}
			alt="Logo"
			resizeMode={ResizeMode.CONTAIN}
		/>
	</View>
)

export interface LandingLayoutProps {
	className?: string;
	logo?: {
		flow?: boolean;
	};
	children: ReactNode;
}
