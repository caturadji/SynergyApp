import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main, Detail } from '../screen'

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={Main}/>
                <Stack.Screen name='Detail' component={Detail}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;
