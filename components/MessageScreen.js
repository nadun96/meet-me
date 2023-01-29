import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import Header from "../components/Header";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import { useAuth } from "../hooks/useAuth";
import { getMatchedUserInfo } from "../lib/getMatchedUserInfo";
import tw from "tailwind-rn";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import db from "../firebase";

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const { input, setInput } = useState("");
  const [messages, setMessages] = useState([]);

  const { matchDetails } = params;

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });

    setInput("");
  };

  return (
    <SafeAreaView style={tw("flex-1")}>
      <Header
        title={getMatchedUserInfo(matchDetails.user, user.uid).displayName}
        CallEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            style={tw("pl-4")}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              messages.userId === user.uid ? (
                <SenderMessage key={messages.id} message={message} />
              ) : (
                <ReceiverMessage key={messages.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View
          style={tw(
            "flex-row justify-between items-center border-t border-gray-500 px-5 py-2"
          )}
        >
          <TextInput
            style={tw("h-10 text-lg")}
            placeholder="Send Message...."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />

          <Button onPress={sendMessage} title="Send" color="#FF586" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

//const styles = StyleSheet.create({}); remember to fix useAuth in 05h
