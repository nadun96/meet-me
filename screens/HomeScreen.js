import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { Profile } from "../screens/Profile";

const HomeScreen = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };


  const [chats, setChats] = React.useState([]);


  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    console.log(chats);
    console.log();
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "MeetMe",
      headerStyle: { backgroundColor: "#E66EB2" },
      headerTitleStyle: {
        color: "black",
        fontWeight: "900",
        fontSize: 24,
      },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 5, marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Avatar
              rounded
              size="medium"
              source={{
                uri: auth?.currentUser?.photoURL
                  ? { uri: auth?.currentUser?.photoURL }
                  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
              }}
              containerStyle={{
                borderWidth: 2,
                borderColor: "black",
                margin: 5,
              }}
              overlayContainerStyle={{
                borderWidth: 2,
                borderColor: "black",
                borderRadius: 30,
              }}
            />
          </TouchableOpacity>
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
        >
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <SimpleLineIcons name="bell" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
