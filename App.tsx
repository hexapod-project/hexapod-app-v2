/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {AppLightTheme} from './src/theme';
import {SnackbarProvider} from './src/components/Snackbar';
import BLEServiceProvider from './src/components/BLEServiceProvider/BLEServiceProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const theme = AppLightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <GestureHandlerRootView>
          <SnackbarProvider>
            <BLEServiceProvider>
              <MainStackNavigator />
            </BLEServiceProvider>
          </SnackbarProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
