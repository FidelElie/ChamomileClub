declare module "*.png" {
  import { ImageSourcePropType } from "react-native";
  const value: ImageSourcePropType;
  export default value;
}

declare module "*.mp4" {
  import { AVPlaybackSource } from "expo-av";
  const value: AVPlaybackSource;
  export default value;
}

declare module "*.ttf" {
  import { FontSource } from "expo-font";
  const value: FontSource;
  export default value;
}
