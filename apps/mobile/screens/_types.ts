import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
	Landing: undefined;
	OTP: { keyId: string };
};

export type RootStackNavigationProps = NativeStackNavigationProp<
	RootStackParamList
>;
