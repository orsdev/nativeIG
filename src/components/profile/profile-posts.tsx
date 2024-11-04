import { ThemeColor } from "@/constants"
import { IProfilePost } from "@/interfaces/profile.interface"
import { Image, StyleSheet, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons'

const ProfilePosts = ({ post }: {
  post: IProfilePost
}) => {
  return (
    <View style={styles.container}>
      <Image source={{
        uri: post.image || post.images?.[0]
      }} style={styles.image} />
      {post.images && (
        <Icon name="collections"
        size={16}
        color={ThemeColor.white}
        style={{
          position: 'absolute',
          top: 5,
          right: 5
        }} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '33%',
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1
  }
})


export default ProfilePosts
