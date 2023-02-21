import React, { useEffect } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { StackNavigation } from './src/navigation';
import { ContextProvider } from './src/context';
import { registerRemoteNotification } from './src/function';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet/src';

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
        <BottomSheetModalProvider>
          <StackNavigation/>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </ContextProvider>
  );
}

export default App;
