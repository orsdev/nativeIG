import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"

interface IPostDescription {
  username: string;
  content: string;
}

export const PostDescription = ({ username, content }: IPostDescription) => {
  const [expanded, setExpanded] = useState(false);
  const numLines = expanded ? 0 : 3;

  return (
    <View style={styles.root}>
      <Text numberOfLines={numLines}>
        <Text
          style={{
            fontWeight: 800
          }}>
          {username}
        </Text>{" "}
        <Text>
          {content}
        </Text>
      </Text>
      <Pressable onPress={() => setExpanded(state => !state)}>
        <Text>
          Read {expanded ? 'Less' : 'More'}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: 1
  }
})
