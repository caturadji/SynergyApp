import React, { useEffect } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { StackNavigation } from './src/navigation';
import { ContextProvider } from './src/context';
import { registerRemoteNotification } from './src/function'

const App = () => {
  const backgroundStyle = {
    flex: 1,
  };

  useEffect(() => {
    registerRemoteNotification()
  },[])

  return (
    <ContextProvider>
      <SafeAreaView style={backgroundStyle}>
          <StackNavigation/>
      </SafeAreaView>
    </ContextProvider>
  );
}

export default App;
