import {
  SafeAreaView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'node_modules/@react-navigation/native-stack/lib/typescript/commonjs/src';
import RootTab from '@/navigation/RootTab';

export type RootStackParamList = {
  home: undefined;
  profile: {
    userId: string
  };
  comment: undefined;
  editProfile: undefined;
  postUpload: undefined;
};

export type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, "profile">;

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootTab />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
