import {
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'node_modules/@react-navigation/native-stack/lib/typescript/commonjs/src';
import RootTab from '@/navigation/RootTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommentScreen from '@/screens/comments';

export type RootStackParamList = {
  homeTab: undefined;
  profile: {
    userId: string
  };
  comments: {
    postId: string;
  }
};

export type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, "profile">;
export type CommentNavigationProp = NativeStackNavigationProp<RootStackParamList, "comments">;

export const AppStack = createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['nativeg://', 'https://nativeg.com'],
  config: {
    initialRouteName: 'homeTab',
    screens: {
      comments: 'comments',
      // Nested screens
      homeTab: {
        screens: {
         feed: {
            initialRouteName: 'feed',
            screens: {
              profile: 'user/:id',
            },
          },
        },
      },
    },
  }
};

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';  

  return (
    <View style={styles.root}>
      <NavigationContainer
      linking={linking}
      >
        <AppStack.Navigator>
          <AppStack.Screen
            name="homeTab"
            options={{
              headerShown: false
            }} component={RootTab} />
          <AppStack.Screen
            name="comments"
            options={{
              headerTitle: 'Comments',
              headerBackTitle: 'Home',
              headerBackButtonDisplayMode: 'minimal' // Hide back to prev screen title
            }}
            component={CommentScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 70
  }
})

export default App;
