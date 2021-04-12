import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import AppProvider from './hooks/index'
import Routes from './routes'

const App: React.FC = () => {
  useEffect(()=>{
    SplashScreen.hide()
  },[])
  return(
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312E38" /*translucent*/ />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#312E38' }} >
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  )
};
export default App;
