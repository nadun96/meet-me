import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };

    useEffect(() => {
        const unsbscribe = db.collection("chats").onSnapshot((snapshot) => {
            setChats(
                snapshot.docs.map((doc) =>({
                id: doc.id,
                data: doc.data(),
            })))
    })
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "MeetMe",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 5 }}>
                    <TouchableOpacity>
                        <Avatar 
                            rounded 
                            source={{
                                uri: auth?.currentUser?.photoURL,
                            }}
                            
                        />
                    </TouchableOpacity>
                </View>
                
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signOutUser}>
                        <AntDesign name="logout" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),

        });
    }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({id, data: { chatName }}) => (
            <CustomListItem  key={id} id={id} chatName={chatName}/>
        ))}
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});