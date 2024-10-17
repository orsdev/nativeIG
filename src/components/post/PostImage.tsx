import { Image, StyleSheet } from "react-native"
import { Carousel, DoublePressable } from "../ui";

interface IPostImage {
  images: Array<string>
  handleClick(): void;
};

export const PostImage = ({ images, handleClick }: IPostImage) => {

  const hasImages = images && !!images?.length;
  let content = null;

  if (hasImages) {
    if (images.length == 1) {
      content = (
        <DoublePressable handlePress={handleClick}>
          <Image
            source={{
              uri: images[0]
            }}
            style={styles.image}
          />
        </DoublePressable>
      )
    } else {
      content = (
        <Carousel
          images={images}
          handleClick={handleClick}
        />
      )
    }
  }

  return content;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1
  }
})