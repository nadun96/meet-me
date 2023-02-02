import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';

const HomeScreen = ({navigation}) => {

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };


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
                    <TouchableOpacity>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signOutUser}>
                        <AntDesign name="logout" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ProfileScreen}>
                        <AntDesign name="user" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),

        });
    }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})