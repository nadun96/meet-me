import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { useAuth } from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import tw from "tailwind-rn";
import { onSnapshot, query, collection, orderBy } from "@firebase/firestore";

const ChatRow = ({ matchesDetails }) => {
  const navigation = useNavigation();
  const user = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchesDetails.users, user.uid));
  }, [matchDetails, user]);

  return (
    <TouchableOpacity
      style={[
        tw("flex-row items-center py-3 px-5 bg-white mx-3  my-1 rounded-lg "),
        styles.cardShadow,
      ]}
      onPress={() =>
        navigation.navigate("Message", {
          matchDetails,
        })
      }
    >
      <Image
        style={tw("w-16 h-16 rounded-full mr-4")}
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <View>
        <Text style={tw("text-lg font-bold")}>
          {matchedUserInfo?.displayname}
        </Text>
        <Text>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
