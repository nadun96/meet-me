import { StyleSheet, Text, View } from "react-native";
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

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  // need to change function body to delete chat
  const deleteChat = async () => {
    const chat = await db
      .collection("chats")
      .where("chatName", "==", input)
      .get();
    chat.forEach((doc) => {
      doc.ref.delete();
    });
  };

  
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <View style={styles.buttonsContainer}>
        <View><Button onPress={createChat} title="Create new Chat" /></View>
        <View style={styles.buttons}><Button onPress={deleteChat} title="Delete Chat" /></View>
      </View>
    </View>


  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 20,
  },
  buttons:{
    marginTop: 20,
  },
});

