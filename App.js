import React, { useEffect, useState } from 'react';
import { ContextProvider } from './src/context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet/src';
import InitialApp from './src/InitialApp';

const App = () => {
  return (
    <ContextProvider>
        <BottomSheetModalProvider>
          <InitialApp/>
        </BottomSheetModalProvider>
    </ContextProvider>
  );
}

export default App;
