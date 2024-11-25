import { Sizes, ThemeColor } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProp } from "App";
import { Image, Pressable, StyleSheet, Text } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'

interface IPostImage {
  imageUri: string;
  userId: string
}


export const PostHeader = ({ imageUri, userId }: IPostImage) => {
  const navigation = useNavigation<ProfileNavigationProp>();

  return (
    <Pressable style={styles.root} onPress={() => {
      navigation.navigate("profile", {
        userId
      })
    }}>
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
    </Pressable>
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
    fontWeight: '800',
    color: ThemeColor.black
  }
})