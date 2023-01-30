import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main, Detail } from '../screen';
import { useDataContext } from '../context';
import { 
    useDeepLink,
    RootNavigation,
    isNaviagtionReadyRef,
    navigationRef
} from '../function';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    const [triggerDeepLink, setTriggerDeepLink] = useState(false);
    const { linkedURL, resetURL } = useDeepLink();

    // HANDLE DEEP LINK
    useEffect(() => {
        if (linkedURL !== null && isNaviagtionReadyRef.current) {
            // Format "synergyapp://page=Detail&id=1"

            const URLSplit = linkedURL.split('/');

            let URLParams = URLSplit[2];
            let arrayParams = URLParams.split('&');

            let params = {};
            let page = '';

            arrayParams.forEach((item) => {
                let keyValue = item.split('=')
                let key = keyValue[0];
                let value = keyValue[1];

                if (String(key).toLocaleLowerCase() === 'page') {
                    page = value
                } else {
                    params[key] = value;
                }
            });

            RootNavigation(page, params.id);
            resetURL();
        } 
    }, [resetURL, triggerDeepLink]);


    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                isNaviagtionReadyRef.current = true,
                setTriggerDeepLink(!triggerDeepLink)
            }}
        >
            <Stack.Navigator mode={'Modal'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={Main}/>
                <Stack.Screen name='Detail' component={Detail}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;
