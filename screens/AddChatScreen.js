import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  // create chat
  const createChat = async () => {
    try {
      await db
        .collection("chats")
        .add({
          chatName: input,
        })
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => alert(error));
      Alert.alert("Success", "Chat Created Successfully");
    } catch (error) {
      Alert.alert("Error", "Create Chat Failed");
      console.log(error);
    }
  };

  const deleteChat = async () => {
    try {
      const chat = await db
        .collection("chats")
        .where("chatName", "==", input)
        .get();
      chat.forEach((doc) => {
        doc.ref.delete();
      });
      navigation.goBack();
      Alert.alert("Success", "Chat deleted successfully");
    } catch (error) {
      Alert.alert("Error", "Delete Chat Failed");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => {
          const trimmedText = text.trim();
          if (!trimmedText) {
            setInput(null);
          } else {
            setInput(trimmedText);
          }
        }}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              if (input) {
                createChat();
              } else {
                Alert.alert("Error", "Please enter a chat name");
              }
            }}
            title="Create new Chat"
          />
        </View>
        <View style={styles.buttons}>
          <Button
            buttonStyle={{ backgroundColor: "red" }}
            onPress={deleteChat}
            title="Delete Chat"
          />
        </View>
      </View>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttons: {
    marginTop: 20,
    backgroundColor: "red",
    borderRadius: 4,
  },
});
