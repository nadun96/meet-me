import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import tw from 'tailwind-rn';
import generateId from '../lib/generateId'

const HomeScreen = () => {
    const navigation = useNavigation();


    const loggedInProfile = await(
        await getDoc(doc(db, "users",user.uid))
        ).data();
    
    //check if the user swipped on you...
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
        (documentSnapshot) => {
            if(documentSnapshot.exists()){
                //user has matched with you before you matched with them...
                //Create a MATCH!
                console.log('Hooray, You MATCHED with ${userSwiped.dispalyName}');
    
            setDoc(
                doc(db, "users", user.uid, "swipes", userSwiped.id),
                userSwiped
                );
    
            //CREATE A MATCH!!!
            setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)),{
            users:{
                [user.uid]:loggedInProfile,
                [userSwiped.id]: userSwiped
                },
                userMatched: [user.uid, userSwiped.id],
                timestamp: serverTimestamp(),
            });
                navigation.navigate("Match",{
                    loggedInProfile,
                    userSwiped,
            });
    
            }else{
            //User has swiped as first interaction between the two or didn't get swiped...
                console.log(
                    'You swiped on ${userSwiped.dispalyName} (${userSwiped.job})'
                );
                setDoc(
                    doc(db,"users",user.uid, "swipes" , userSwiped.id),
                    userSwiped
                );
            
                }
    
        }
    );

    return (
        <SafeAreaView>
            {/* Header */}
            <View>
                <TouchableOpacity>
                    <Image 
                        style={{width: 100, height: 100}}
                        source={'https://i.imgur.com/o7umiJN.jpeg'} 
                    />
                </TouchableOpacity>
            </View>
            {/* End of header */}
            <Text>HomeScreen</Text>
        </SafeAreaView>
    );
}

export default HomeScreen