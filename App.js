import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { StackNavigation } from './src/navigation';
import { ContextProvider } from './src/context';

const App = () => {
  const backgroundStyle = {
    flex: 1,
  };

  return (
    <ContextProvider>
      <SafeAreaView style={backgroundStyle}>
          <StackNavigation/>
      </SafeAreaView>
    </ContextProvider>
  );
}

export default App;
