import { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
	Landing: undefined;
	Login: undefined;
	OTP: { keyId: string };
	Bridge: undefined;
	HomeTabs: undefined;
};

export type RootStackNavigationProps = NativeStackNavigationProp<
	RootStackParamList
>;

export type RootStackRouteProps<
	T extends keyof RootStackParamList
> = RouteProp<RootStackParamList, T>;
