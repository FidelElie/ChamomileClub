import type { ReactNode } from "react";
import { Modal as ReactNativeModal, Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";

export const Modal = (props: ModalProps) => {
  const {
    animation = "slide",
    overlayClassName,
    contentClassName,
    visible,
    children,
    onRequestClose,
  } = props;

  return (
    <ReactNativeModal visible={visible} animationType={animation} transparent>
      <Pressable
        className={twMerge("flex-grow", overlayClassName)}
        onPressIn={onRequestClose}
      />
      <View className={twMerge("w-full", contentClassName)}>
        {children}
      </View>
    </ReactNativeModal>
  );
};

export interface ModalProps {
  animation?: "none" | "slide" | "fade";
  overlayClassName?: string;
  contentClassName?: string;
  visible: boolean;
  onRequestClose: () => void;
  children?: ReactNode;
}
