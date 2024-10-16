import { Pressable, Text, View } from "react-native"
import { ThemeColor } from "@/constants";
import Feather from 'react-native-vector-icons/Feather'
import { StyleSheet } from "react-native";

interface IPostComment {
  username: string;
  totalComments: number;
  comment: string;
  date: string
}

export const PostComment = ({ username, totalComments, comment, date }: IPostComment) => {
  return (
    <View>
      {/* Comment */}
      <Pressable>
        <Text style={{
          color: ThemeColor.grey,
          marginTop: 5
        }}>{`View all ${totalComments} comments`}</Text>
      </Pressable>
      <View style={styles.comment}>

        <Text style={styles.commentText}>
          <Text style={{ fontWeight: 800 }}>{username}</Text>{" "}
          <Text>
            {comment}
          </Text>
        </Text>
        <Feather name="heart" size={20}
          style={{ marginLeft: 'auto' }}
          color={ThemeColor.black} />
      </View>

      {/* Date */}
      <Text style={{ color: ThemeColor.grey }}>{date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  commentText: {
    color: ThemeColor.black,
    flex: 1
  }
})