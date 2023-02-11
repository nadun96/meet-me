import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";
import { Image } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    navigation.setOptions({
      title: "MeetMe",
      headerStyle: { backgroundColor: "#fff", fontStyle: "italic" },
      headerTitleStyle: { color: "black" },
      headerTitleAlign: "center",
      headerTintColor: "black",
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autofocus
          type="email"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
          containerStyle={styles.input}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          containerStyle={styles.input}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5,
    marginTop: 30,
  },

  inputContainer: {
    width: "80%",
    alignItems: "center",
  },

  button: {
    width: "40%",
    marginTop: 5,
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },

  input: {
    width: "80%",
    marginBottom: 30,
  },
});
