import {
  SafeAreaView
} from 'react-native';
import HomeScreen from '@/screens/home';
import CommentScreen from '@/screens/comments';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';  

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <HomeScreen /> */}
      <CommentScreen />

   </SafeAreaView>
  );
}

export default App;
