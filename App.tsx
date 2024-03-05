/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AppLightTheme } from './src/theme';

function App(): React.JSX.Element {
  const theme = AppLightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <MainStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
