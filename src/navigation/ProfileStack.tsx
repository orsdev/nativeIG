import EditProfileScreen from '@/screens/edit-profile';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProfileScreen from '@/screens/profile';

export type ProfileStackParamList = {
  profileScreen: {
    userId: string
  };
  editProfileScreen: {
    userId: string
  };
};


export type EditProfileNavigationProp = NativeStackNavigationProp<ProfileStackParamList, "editProfileScreen">;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="profileScreen" component={ProfileScreen} />
      <Stack.Screen name="editProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}


export default ProfileStack