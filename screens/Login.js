import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import { StyleSheet, View, Text, Button, ImageBackground, TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
          <Text onPress={signInWithGoogle}>
            Sign In
          </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#979e80',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default LoginScreen;
