import {
  SafeAreaView
} from 'react-native';
import HomeScreen from '@/screens/home';
import CommentScreen from '@/screens/comments';
import ProfileScreen from '@/screens/profile';
import EditProfileScreen from '@/screens/edit-profile';
import PostUploadScreen from '@/screens/post-upload';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <HomeScreen /> */}
      {/* <CommentScreen /> */}
      {/* <ProfileScreen /> */}
      {/* <EditProfileScreen /> */}
      <PostUploadScreen />
    </SafeAreaView>
  );
}

export default App;
