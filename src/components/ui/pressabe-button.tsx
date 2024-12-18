import { Sizes, ThemeColor } from "@/constants";
import { Pressable, StyleSheet, Text } from "react-native"

interface PressableButtonProps {
  handlePress(): void;
  isLoading?: boolean;
  isDisabled?: boolean;
  pressedStyle?: {},
  buttonStyle?: {},
  buttonTextStyle?: {}
  title: string;
}
export const PressableButton = ({
  title,
  isDisabled = false,
  isLoading = false,
  buttonStyle = {},
  pressedStyle = {},
  buttonTextStyle = {},
  handlePress
}: PressableButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => {
        return [styles.button,
        (isLoading || isDisabled) ? styles.disabled : {},
        pressed ? styles.pressed : {},
        pressed ? pressedStyle : {},
          buttonStyle
        ]
      }}
      disabled={isLoading || isDisabled}
      onPress={handlePress}>
      <Text style={[styles.buttonText, buttonTextStyle]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColor.primary,
    padding: 10,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Sizes.sm,
    color: ThemeColor.white
  },
  disabled: {
    backgroundColor: ThemeColor.grey,
  },
  pressed: {
    opacity: .8
  }
})
