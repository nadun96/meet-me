import { View,Button, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import tw from 'tailwind-rn';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View>  
            <Text>HomeScreen</Text>
            <Button title="Go to Chat" onPress={() => navigation.navigate('Chat') } />
        </View>
    );
}

export default HomeScreen