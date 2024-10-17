import { ReactNode } from "react"
import { Pressable, TouchableWithoutFeedback, View } from "react-native"

interface IDoublePressable {
  handlePress(): void,
  children: ReactNode
}

//TODO: Clickable component prevents horizontal scroll from working
export const DoublePressable = ({ handlePress, children }: IDoublePressable) => {
  let lastTap = 0;
  const handleDoublePress = () => {
    const now = Date.now();

    if ((now - lastTap) < 300) {
      handlePress();
    }

    lastTap = now;
  }

  return (
    <TouchableWithoutFeedback
      style={{
        width: '100%'
      }}
      onPress={handleDoublePress}
    >
      <View>
        {children}
      </View>
    </TouchableWithoutFeedback>
  )
}
