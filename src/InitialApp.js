import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Button,
  Text
} from 'react-native';
import { StackNavigation } from './navigation';
import { requestNotificationPermission } from './function';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { fontStyles } from './styles';


const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true }); // Allow pin code
// const rnBiometrics = new ReactNativeBiometrics();

const App = () => {
  const backgroundStyle = {
    flex: 1,
  };

  const [isBimetricsConfirmed, setIsBimetricsConfirmed] = useState(false);


  useEffect(() => {
    requestNotificationPermission();
    checkBiometricsSensor();
  },[]) 

  const checkBiometricsSensor = () => {
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject

        if (available && biometryType === BiometryTypes.TouchID) {
          console.log('TouchID is supported')
          requestBiometrics()
        } else if (available && biometryType === BiometryTypes.FaceID) {
          console.log('FaceID is supported')
          requestBiometrics()
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          console.log('Biometrics is supported')
          requestBiometrics()
        } else {
          console.log('Biometrics not supported')
          setIsBimetricsConfirmed(true)
        }
      })
  }

  const checkBiometricsKey = () => {
    rnBiometrics.biometricKeysExist()
      .then((resultObject) => {
        const { keysExist } = resultObject

        if (keysExist) {
          console.log('Keys exist')
          console.log(keysExist)
          requestBiometrics()
        } else {
          console.log('Keys do not exist or were deleted')
          createBiometricsKey()
        }
      })  
  }

  const createBiometricsKey = () => {
    rnBiometrics.createKeys()
      .then((resultObject) => {
        const { publicKey } = resultObject
        console.log('Public Key: ', publicKey)
      }).catch(() => {
        console.log('error create biometrics')
      })
  }

  const requestBiometrics = () => {
    rnBiometrics.simplePrompt({ promptMessage: 'Confirm Fingerprint' })
      .then((resultObject) => {
        const { success } = resultObject

        if (success) {
          console.log('successful biometrics provided')
          setIsBimetricsConfirmed(true)
        } else {
          console.log('user cancelled biometric prompt')
        }
      })
      .catch(() => {
        console.log('biometrics failed')
      })
  }

  const createSignature = () => {
    let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
    let payload = epochTimeSeconds + 'some message'

    rnBiometrics.createSignature({
      promptMessage: 'Sign in',
      payload: payload
    })
      .then((resultObject) => {
        const { success, signature } = resultObject
    
        if (success) {
          console.log(signature)
        }
      })
  }

  const deleteBiometricsKey = () => {
    rnBiometrics.deleteKeys()
      .then((resultObject) => {
        const { keysDeleted } = resultObject

        if (keysDeleted) {
          console.log('Successful deletion')
        } else {
          console.log('Unsuccessful deletion because there were no keys to delete')
        }
      })
  }

  const renderBody = () => {
    if (isBimetricsConfirmed) {
      return <StackNavigation/>
    } else {
      return ( 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[fontStyles.detailBody, { margin: 15 }]}>You need confirm your identity first</Text>
          <Button title='Confirm' onPress={checkBiometricsSensor}/>
        </View>
      )
    }
  }

  return (
        <SafeAreaView style={backgroundStyle}>
          {renderBody()}
        </SafeAreaView>
  );
}

export default App;
