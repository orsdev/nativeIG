import AddComment from "@/components/post/AddComment"
import { PostComment } from "@/components/post/PostComment"
import { CommentData, ThemeColor } from "@/constants"
import { useRoute, type RouteProp} from '@react-navigation/native';
import { StackParamList } from "App"
import { FlatList,  StyleSheet, View } from "react-native"

type CommentRouteProps = RouteProp<StackParamList, 'comments'>;

const CommentScreen = () => {
  const route = useRoute<CommentRouteProps>();
  const params = route.params;

  console.log(params?.postId)
   return (
    <View style={styles.root}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={CommentData}
          // style={{ flex: 1, width: '100%' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 20
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostComment
            isBasic={false}
            image={item.user.image}
            username={item.user.username}
            comment={item.comment}
            date={item.createdAt}
          />}
        />
      </View>
      <View style={styles.footer}>
        <AddComment avatar="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg" />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 20,
    position: 'relative',
  },
  flatListContainer: {
    flex: 1,
    padding: 10
  },
  footer: {
    borderColor: ThemeColor.border,
    borderTopWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50
  }
})

export default CommentScreen