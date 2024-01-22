import { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type LandingStackParamList = {
  Landing: undefined;
  Login: undefined;
  OTP: { keyId: string; };
};

export type LandingStackNavigationProps = NativeStackNavigationProp<LandingStackParamList>;

export type LandingStackRouteProps<T extends keyof LandingStackParamList> = RouteProp<LandingStackParamList, T>;
