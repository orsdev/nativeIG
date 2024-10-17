import {
  SafeAreaView
} from 'react-native';
import HomeScreen from '@/screens/home';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';  

  return (
    <SafeAreaView>
      <HomeScreen />
    </SafeAreaView>
  );
}

export default App;
