import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import Login from './screens/Login';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    const user = true;

    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        {user ? (
          <>
            <Stack.Group>
              <Stack.Screen name="Home" component={HomeScreen} />

              <Stack.Screen name="Chat" component={ChatScreen} />

              <Stack.Screen name="Message" component={MessageScreen} />
            </Stack.Group>
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    );
}

export default StackNavigator