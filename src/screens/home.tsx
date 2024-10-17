import {
  FlatList
} from 'react-native';
import { PostData } from '@/constants';
import { PostContent } from '@/components/post';

const HomeScreen = () => {
  return (
    <FlatList
      data={PostData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PostContent post={item} />}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default HomeScreen
