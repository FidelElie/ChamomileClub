import { ReactNode, ComponentProps, forwardRef } from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";

export const BaseBanner = forwardRef<View, BannerProps>((props, ref) => {
  const { className, state, children, ...viewProps } = props;

  return (
    <View
      ref={ref}
      className={twMerge(
        "bg-white p-2 rounded items-center",
        state === "ERROR" && "border-b-2 border-chilli",
        className,
      )}
      {...viewProps}
    >
      {children}
    </View>
  );
});

const ErrorBanner = forwardRef<View, BannerWithStateProps>((props, ref) => (
  <BaseBanner {...props} ref={ref} state="ERROR" />
));

export interface BannerProps extends ComponentProps<typeof View> {
  className?: string;
  state?: "ERROR";
  children: ReactNode;
}

export type BannerWithStateProps = Omit<BannerProps, "state">;

export const Banner = Object.assign(BaseBanner, {
  Error: ErrorBanner,
});
