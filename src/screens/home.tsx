import {
  FlatList
} from 'react-native';
import PostJson from '@/assets/posts.json'
import { PostContent } from '@/components/post';

const HomeScreen = () => {
  return (
    <FlatList
      data={PostJson}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PostContent post={item} />}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default HomeScreen
