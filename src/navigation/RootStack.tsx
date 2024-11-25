import CommentScreen from '@/screens/comments';
import EditProfileScreen from '@/screens/edit-profile';
import PostUploadScreen from '@/screens/post-upload';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import HomeScreen from '@/screens/home';
import ProfileScreen from '@/screens/profile';


const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName='home'
    >
      <Stack.Group screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            headerTitle: ''
          }} />

      </Stack.Group>
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="comment" component={CommentScreen} />
      <Stack.Screen name="editProfile" component={EditProfileScreen} />
      <Stack.Screen name="postUpload" component={PostUploadScreen} />
    </Stack.Navigator>
  );
}


export default RootStack