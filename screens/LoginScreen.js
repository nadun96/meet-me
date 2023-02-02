import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const signIn = () => { };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri: "https://www.shutterstock.com/image-vector/wifi-icon-interface-design-vector-260nw-1448076602.jpg",
                }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autofocus
                    type="email"
                    autoFocus
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    containerStyle={styles.button}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    containerStyle={styles.button}
                />
            </View>
            <Button
                containerStyle={styles.button}
                onPress={signIn}
                title="Login"
            />
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
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});