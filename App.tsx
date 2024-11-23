import {
  SafeAreaView
} from 'react-native';
import HomeScreen from '@/screens/home';
import CommentScreen from '@/screens/comments';
import ProfileScreen from '@/screens/profile';
import EditProfileScreen from '@/screens/edit-profile';
import PostUploadScreen from '@/screens/post-upload';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
    // initialRouteName='profile'
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTitle: ''
        }} />
      <Stack.Screen name="comment" component={CommentScreen} />
      <Stack.Screen name="edit-profile" component={EditProfileScreen} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="post-upload" component={PostUploadScreen} />
    </Stack.Navigator>
  );
}


function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
