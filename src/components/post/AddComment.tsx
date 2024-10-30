import { ThemeColor } from "@/constants";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native"

interface IAddComment {
  avatar: string;
}

const AddComment = ({ avatar }: IAddComment) => {
  const [text, onChangeText] = useState('');

  const handlePostComment = () => {
    console.log(text)
  }

  return (
    <View style={styles.root}>
      <Image source={{ uri: avatar }} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Write your comment..."
        autoCapitalize="none"
        autoCorrect={false}
        multiline={true}
        onChangeText={onChangeText}
        value={text}
      />
      <Pressable style={styles.pressable} onPress={handlePostComment}>
        <Text style={{ color: ThemeColor.primary, fontSize: 12 }}>POST</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    justifyContent: 'space-between'
  },
  image: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 25
  },
  input: {
    height: 40,
    flex: 1,
    borderRadius: 25,
    paddingRight: 50,
    borderColor: ThemeColor.border,
    borderWidth: 1,
    padding: 10,
  },
  pressable: {
    position: 'absolute',
    right: 10
  }
})


export default AddComment