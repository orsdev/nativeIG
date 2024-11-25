import ProfileScreen from '@/screens/profile';
import PostUploadScreen from '@/screens/post-upload';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeColor } from '@/constants';
import RootStack from './RootStack';

const Tab = createBottomTabNavigator();

function RootTab() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: ThemeColor.primary,
      tabBarInactiveTintColor: ThemeColor.black
    }}>
      <Tab.Screen
        name="feed"
        component={RootStack}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <FeatherIcon name="home" size={size} color={color} />
            )
          }
        }}
      />
      <Tab.Screen
        name="search"
        component={PostUploadScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="uploadPost"
        component={PostUploadScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="notifications"
        component={PostUploadScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="heart-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="myProfile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <FeatherIcon name="user" size={size} color={color} />
            )
          }
        }}
        component={ProfileScreen} />
    </Tab.Navigator>
  )
};

export default RootTab