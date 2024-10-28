import { FlatList, Image, StyleSheet, useWindowDimensions, View, ViewToken } from "react-native"
import { DoublePressable } from "./double-pressable";
import { ThemeColor } from "@/constants";
import { useMemo, useState } from "react";

interface ICarousel {
  images: Array<string>
  handleClick(): void;
};

// TODO: Scroll Explanation

/**
 * 
 Explanation
contentOffset.x: This value tells you how far the FlatList has been scrolled horizontally, measured in pixels.

Item width: Each item in the FlatList has a certain width (e.g., 200 pixels in the previous example). When you divide the scroll distance (contentOffset.x) by the item width, you're essentially calculating how many items (or "full item widths") the user has scrolled past.

Why Division?
Mapping distance to index: contentOffset.x gives you a continuous value of the horizontal scroll distance in pixels, but you want to know how many whole items you've scrolled through. If each item is, say, 200 pixels wide, dividing the scroll distance by the item width gives you the number of whole items that have been scrolled.

For example:

If you've scrolled 400 pixels, and each item is 200 pixels wide, dividing 400 / 200 gives you 2, meaning you're on the 3rd item (because indexes are zero-based).
Index calculation: Since the FlatList is paginated (in this example), scrolling 1 full item means you move from index 0 to index 1. By dividing the total scroll offset by the item width, you calculate the item index that corresponds to the scroll position.

 */

export const Carousel = ({ images, handleClick }: ICarousel) => {
  const { width } = useWindowDimensions();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const contentOffsetX = event.nativeEvent.contentOffset.x;
  //   const itemWidth = event.nativeEvent.layoutMeasurement.width;
  //   const index = Math.round(contentOffsetX / itemWidth);
  //   setActiveImageIndex(index)
  // };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51
  };

  // TODO: Fixes this bug
  // Warning: Invariant Violation: Changing onViewableItemsChanged nullability on the fly is not supported
  const onViewableItemsChanged = useMemo(() => (info: {
    viewableItems:
    ViewToken<string>[];
    changed: ViewToken<string>[];
  }) => {
    const { changed, viewableItems } = info;

    if (!!viewableItems?.length) {
      const index = changed[0]?.index ?? 0;
      setActiveImageIndex(index)
    }
  }, [])

  return (
    <View style={styles.root}>
      <View style={styles.listContainer}>
        <FlatList
          // onScroll={onScroll}
          horizontal
          data={images}
          showsHorizontalScrollIndicator={false}
          keyExtractor={it => it}
          // TODO: // Snap and dont slide half way
          pagingEnabled={true}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          renderItem={({ item }) => (
            <DoublePressable
              handlePress={handleClick}
            >
              <Image
                source={{
                  uri: item
                }}
                style={[styles.img, {
                  width
                }]}
              />
            </DoublePressable>
          )
          }
        />
      </View>
      <View style={styles.dotContainer}>
        {images.map(((_, ind) => (
          <View style={[styles.dot,
          { backgroundColor: activeImageIndex === ind ? ThemeColor.primary : ThemeColor.white }
          ]} key={ind} />
        )))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    position: 'relative',
    flex: 1,
  },
  img: {
    flex: 1,
    aspectRatio: 1
  },
  listContainer: {
    flex: 1,
  },
  dotContainer: {
    flexDirection: 'row',
    columnGap: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    height: 20,
    width: '100%'
  },
  dot: {
    width: 10,
    aspectRatio: 1,
    borderRadius: 5,
    backgroundColor: ThemeColor.grey
  }
})
