// ChatScreen.js
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { auth, db, firebase } from "../firebase";

const ChatScreen = ({ navigation, route }) => {
  console.log(route.params.id);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        ></View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    console.log(firebase.firestore.FieldValue.serverTimestamp());
    console.log(input);
    console.log(auth.currentUser.displayName);
    console.log(auth.currentUser.photoURL);

    Keyboard.dismiss();
    db.collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL:
          auth.currentUser.photoURL ||
          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
      });
    setInput("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiis}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      position="absolute"
                      bottom={-15}
                      right={-15}
                      rounded
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position="absolute"
                      bottom={-15}
                      left={-15}
                      rounded
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
                style={styles.textInput}
                placeholder="Type Your Message"
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="pink" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#286BE6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
});
