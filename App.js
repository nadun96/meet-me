import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import { useTailwind } from 'tailwind-rn';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
    </TailwindProvider>
  );
}

