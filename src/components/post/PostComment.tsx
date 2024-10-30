import { Image, Pressable, Text, View } from "react-native"
import { ThemeColor } from "@/constants";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { StyleSheet } from "react-native";
import { formatDateDistance } from "@/libs";
import { useState } from "react";

interface IPostComment {
  username: string;
  comment: string;
  date: string,
  image?: string;
  isBasic?: boolean
}


export const PostComment = ({ username, comment, date, image, isBasic = true }: IPostComment) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(state => !state)
  }

  return (
    <View style={styles.root}>
      {!isBasic && image && (
        <Image source={{ uri: image }} style={styles.avatar} />
      )}
      <View style={{ flex: 1 }}>
        <View style={styles.comment}>
          <Text style={styles.commentText}>
            <Text style={{ fontWeight: 800 }}>{username}</Text>{" "}
            <Text>
              {comment}
            </Text>
          </Text>
          <Pressable
            hitSlop={5}
            onPress={toggleLike}
          >
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              style={{ marginLeft: 'auto' }}
              color={isLiked ? ThemeColor.accent : ThemeColor.black} />
          </Pressable>
        </View>

        {!isBasic && (
          <View style={styles.footer}>
            <Text style={styles.grayColor}>
              {formatDateDistance(date)}
            </Text>
            <Text style={styles.grayColor}> 5 likes</Text>
            <Pressable>
              <Text style={styles.grayColor}>Reply</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 5
  },
  avatar: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 25
  },
  comment: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  commentText: {
    color: ThemeColor.black,
    flex: 1
  },
  grayColor: {
    color: ThemeColor.grey
  },
  footer: {
    marginTop: 5,
    flexDirection: 'row',
    gap: 5
  }
})
