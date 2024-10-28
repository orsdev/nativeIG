import {
  FlatList,
  ViewToken
} from 'react-native';
import { PostData } from '@/constants';
import { PostContent } from '@/components/post';
import { useMemo, useState } from "react";
import { IPost } from '@/interfaces/post.interface';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string>('')

  const onViewableItemsChanged = useMemo(() => (info: {
    viewableItems:
    ViewToken<IPost>[];
    changed: ViewToken<IPost>[];
  }) => {
    const { changed, viewableItems } = info;

    if (!!viewableItems?.length) {
      const item = changed[0]?.item;
      setActivePostId(item.id ?? '')
    }
  }, [])

  const viewabilityConfig = useMemo(() => {
    return { itemVisiblePercentThreshold: 95 }
  }, []);

  return (
    <FlatList
      data={PostData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PostContent post={item} activePostId={activePostId} />}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  )
}

export default HomeScreen
