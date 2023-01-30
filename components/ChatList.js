import {collection, onSnapshot, query, where} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-web';
import tw from 'tailwind-rn';
import db from '../firebase';
import { useAuth } from '../hooks/useAuth';
import ChatRow from './ChatRow';

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const user = useAuth();
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where('userMatches', 'array-contains', user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
        )
      ),
      [user]
      );
    
  return (
    matches.length > 0 ? (
      <FileList 
        style={tw("h-full")}
        data={matches}
        keyExtractor={(item) => item.id}  
        renderItem={({ item }) => <ChatRow matchesDetails={item} />}
      />
    ) : (
        <View style={tw("flex-1 items-center justify-center")}>
          <Text style={tw("text-center text-lg")}>No Matches Yet</Text>
        </View>
    )
  );
  };

export default ChatList