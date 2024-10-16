import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PostJson from './src/assets/posts.json'
import { PostContent } from '@/components/post';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';  

  return (
    <SafeAreaView>
      <ScrollView>
        {PostJson.map(item => (
          <PostContent
            key={item.id}
            image={item.image}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {}
});

export default App;
