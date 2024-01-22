import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  MainTabs: undefined;
  Add: undefined;
  EditProfile: undefined;
  CreateEvent: undefined;
};

export type AuthStackNavigationProps = NativeStackNavigationProp<AuthStackParamList>;

export type AuthStackRouteProps = RouteProp<
  AuthStackParamList,
  keyof AuthStackParamList
>;
