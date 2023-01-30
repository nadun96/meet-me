import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const {user} = useAuth();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            { user ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                </>
            ) : (
                    <Stack.Screen name="Login" component={Login} />
            )}
        
            
            
        </Stack.Navigator>
    )
}

export default StackNavigator