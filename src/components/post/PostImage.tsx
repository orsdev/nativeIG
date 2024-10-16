import { Image, StyleSheet } from "react-native"

export const PostImage = ({ image }: { image: string }) => {
  return (
    <Image
      source={{
        uri: image
      }}
      style={styles.image}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1
  }
})