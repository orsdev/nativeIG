import EditProfileScreen from '@/screens/edit-profile';
import PostUploadScreen from '@/screens/post-upload';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/home';
import ProfileScreen from '@/screens/profile';

export type RootStackParamList = {
  home: undefined;
  userProfile: {
    userId: string
  };
  comment: undefined;
  editProfile: undefined;
  postUpload: undefined;
};

export type UserProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, "userProfile">;
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
      <Stack.Screen name="userProfile" options={{title: 'Profile'}} component={ProfileScreen} />
      <Stack.Screen name="editProfile" component={EditProfileScreen} />
      <Stack.Screen name="postUpload" component={PostUploadScreen} />
    </Stack.Navigator>
  );
}


export default RootStack