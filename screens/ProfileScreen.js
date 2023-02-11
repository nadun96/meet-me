import React from 'react';
import { View, Text, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View>
      <Image 
        style={{ width: 100, height: 100 }}
        source={{ uri: auth?.currentUser?.photoURL }}
      />
      <Text>Username: {auth?.currentUser?.displayName}</Text>
      <Text>Email: {auth?.currentUser?.email}</Text>
    </View>
  );
};

export default ProfileScreen;