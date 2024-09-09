/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quas numquam nemo illum enim aspernatur amet accusamus sed voluptatibus rerum, eius, repellat totam et ipsam? Quis maiores dignissimos nisi quod?
      </Text>
      <AwesomeIcon name="car" size={30} color="#900" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {}
});

export default App;
