import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import tw from 'tailwind-rn';

const HomeScreen = () => {
    const navigation = useNavigation();

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