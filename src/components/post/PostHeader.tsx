import { Sizes, ThemeColor } from "@/constants";
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'

interface IPostImage {
  imageUri: string;
}

export const PostHeader = ({ imageUri }: IPostImage) => {
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: imageUri
        }}
        style={styles.avatar}
      />
      <Text style={styles.userName}>sogundare</Text>
      <Pressable style={styles.pressableIcon}>
        <Entypo name="dots-three-horizontal" size={16} style={styles.threeDot} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
    padding: 10

  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 35
  },
  pressableIcon: {
    marginLeft: 'auto'
  },
  threeDot: {
    marginLeft: 'auto'
  },
  userName: {
    fontSize: Sizes.sm,
    fontWeight: 800,
    color: ThemeColor.black
  }
})