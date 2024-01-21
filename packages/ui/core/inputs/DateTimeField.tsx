import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, Pressable, StyleProp, StyleSheet, ViewProps } from "react-native";

import { Copy } from "../data/Copy";
import { Flex } from "../layouts/Flex";
import { Show } from "../utilities/Show";
import { Button, ButtonProps } from "./Button";

const DATE_FIELD_STATES = { datetime: false, date: false, time: false };

export const DateTimeField = (props: DateTimeFieldProps) => {
  const {
    message,
    closeText = "Close",
    className,
    theme = "PRIMARY",
    placeholder = "Select date",
    value,
    onChange,
    formatDate,
    style,
    ...datePickerProps
  } = props;

  const [display, setDisplay] = useState(DATE_FIELD_STATES);

  const handleDateSelection = (date?: Date) => {
    if (date && onChange) { onChange(date); }
  };

  const editDisplay = (newDisplay: Partial<typeof display>) => {
    setDisplay((currentDisplay) => ({ ...currentDisplay, ...newDisplay }));
  };

  const displayDate = (date: Date) => {
    if (!date) { return; }

    if (formatDate) { return formatDate(date); }

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const closeDatePopup = () => setDisplay(DATE_FIELD_STATES);

  const fieldTheming = {
    buttonTheme: theme,
    textColor: theme === "SECONDARY" ? "green" : "white",
  } as const;

  return (
    <Flex.Column className={className} style={style}>
      <Button
        theme={fieldTheming.buttonTheme}
        onPressIn={() => editDisplay({ date: true })}
      >
        <Copy color={fieldTheming.textColor}>
          {value ? displayDate(value) : placeholder}
        </Copy>
      </Button>
      <Modal visible={display.date} animationType="slide" transparent>
        <Pressable className="flex-grow" onPressIn={closeDatePopup} />
        <Flex className="w-full bg-white py-6 px-5">
          <DateTimePicker
            value={value ?? new Date()}
            mode="datetime"
            display="spinner"
            onChange={(_, date) => handleDateSelection(date)}
            {...datePickerProps}
          />
          <Button theme="PRIMARY" className="" onPressIn={closeDatePopup}>
            <Copy>{closeText}</Copy>
          </Button>
        </Flex>
      </Modal>
    </Flex.Column>
  );
};

export interface DateTimeFieldProps {
  message?: string;
  closeText?: string;
  className?: string;
  theme?: ButtonProps["theme"];
  value?: Date | null;
  placeholder?: string;
  onChange?: (date: Date | null) => void;
  formatDate?: (date: Date) => string;
  minimumDate?: Date;
  maximumDate?: Date;
  style?: StyleProp<ViewProps>;
}
