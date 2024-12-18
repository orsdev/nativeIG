import {
  StyleSheet,
  View
} from 'react-native';
import {
  LinkingOptions,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootTab, { RootTabParamList } from '@/navigation/RootTab';
import CommentScreen from '@/screens/comments';
import { Amplify } from "aws-amplify";
import outputs from "./amplify_outputs.json";
import SignInScreen from '@/screens/sign-in';
import SignUpScreen from '@/screens/sign-up';
import VerifyScreen from '@/screens/verify';
import { useAuthSession, useProtectedRoute } from '@/hooks';

Amplify.configure(outputs);

export type StackParamList = {
  homeTab: NavigatorScreenParams<RootTabParamList>;
  signIn: undefined;
  verify: {
    username: string
  },
  signUp: undefined;
  myProfile: { userId: string };
  comments: { postId: string };
};

export type MyProfileNavigationProp = NativeStackNavigationProp<StackParamList, "myProfile">;
export type HomeNavigationProp = NativeStackNavigationProp<StackParamList, "homeTab">;
export type CommentNavigationProp = NativeStackNavigationProp<StackParamList, "comments">;
export type SignUpNavigationProp = NativeStackNavigationProp<StackParamList, "signUp">;
export type SignInNavigationProp = NativeStackNavigationProp<StackParamList, "signIn">;
export type VerifyNavigationProp = NativeStackNavigationProp<StackParamList, "verify">;

const AppStack = createNativeStackNavigator<StackParamList>();

const linking: LinkingOptions<StackParamList> = {
  prefixes: ['nativeg://', 'https://nativeg.com'],
  config: {
    screens: {
      homeTab: {
        screens: {
          feed: {
            initialRouteName: 'home' as never,
            screens: {
              userProfile: 'user/:id',
            }
          }
        },
      },
      signIn: 'sign-in',
      signUp: 'sign-up',
      comments: 'comments',
    },
  }
};

function App(): React.JSX.Element {
  const {user} = useProtectedRoute()

  return (
    <View style={styles.root}>
      <AppStack.Navigator initialRouteName="signIn">
        {!user && (
          <>
            <AppStack.Screen
              name="signIn"
              options={{
                headerShown: false
              }}
              component={SignInScreen}
            />

            <AppStack.Screen
              name="signUp"
              options={{
                headerShown: false
              }}
              component={SignUpScreen}
            />
            <AppStack.Screen
              name="verify"
              options={{
                headerShown: false
              }}
              component={VerifyScreen}
            />
          </>
        )}
        {user && (
          <>
            <AppStack.Screen
              name="homeTab"
              options={{
                headerShown: false
              }}
              component={RootTab}
            />
            <AppStack.Screen
              name="comments"
              options={{
                headerTitle: 'Comments',
                headerBackTitle: 'Home',
                headerBackButtonDisplayMode: 'minimal' // Hide back to prev screen title
              }}
              component={CommentScreen}
            />
          </>
        )}
      </AppStack.Navigator>
    </View>
  );
}

function Main(): React.JSX.Element {
  return (
    <View style={styles.root}>
      <NavigationContainer linking={linking}>
        <App />
      </NavigationContainer>
    </View>
  );
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 70
  }
});

export default Main;
