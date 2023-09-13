const tailwindConfig = require("@thechamomileclub/ui/tailwind.config");

/** @type {import('expo/config').ExpoConfig} */
module.exports = {
	name: "thechamomileclub",
	slug: "thechamomileclub",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/logos/yellow-alt-logo.png",
	backgroundColor: tailwindConfig.theme.colors.green,
	userInterfaceStyle: "light",
	splash: {
		image: "./assets/images/splash-screen-yellow-alt.png",
		resizeMode: "contain",
		backgroundColor: tailwindConfig.theme.colors.green
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		supportsTablet: true
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/logos/yellow-alt-logo.png",
			backgroundColor: tailwindConfig.theme.colors.green
		}
	},
	experiments: {
		tsconfigPaths: true
	},
	plugins: [
		[
			"expo-image-picker",
			{
				"photosPermission": "The app accesses your photos to let you share them with your friends."
			}
		]
	]
}
