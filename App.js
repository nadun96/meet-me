import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
//import { AuthProvider } from './hooks/useAuth';
import tw from 'tailwind-rn';

export default function App() {
  return (
    <View style={tw("justify-center items-center")}>
      <Text>App</Text>
    </View>
  );
}

