import { ThemeColor } from '@/constants';
import CommentScreen from '@/screens/comments';
import HomeScreen from '@/screens/home';
import UserSearchScreen from '@/screens/user-search';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

export type SearchbarParamList = {
  Users: undefined;
  Posts: undefined
};

export type UsersSearchNavigationProp = MaterialTopTabNavigationProp<SearchbarParamList, "Users">;

const Tab = createMaterialTopTabNavigator<SearchbarParamList>();

function SearchTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: ThemeColor.primary
        }
      }}
    >
      <Tab.Screen
        name="Users"
        component={UserSearchScreen}
      />
      <Tab.Screen
        name="Posts"
        component={CommentScreen} />
    </Tab.Navigator>
  );
}

export default SearchTab;