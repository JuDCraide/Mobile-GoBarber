import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks/index'
import Routes from './routes'

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312E38" />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#312E38' }} >
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);
export default App;
