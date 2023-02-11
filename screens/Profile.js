import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase/compat/app";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import * as ImagePicker from "react-native-image-picker";

const Profile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const selectPicture = () => {
    const options = {
      title: "Select Profile Picture",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        setAvatarSource(response.uri);
      }
    });
  };

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const handleUpdate = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      user
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          user
            .updateEmail(email)
            .then(() => {
              user
                .updatePassword(password)
                .then(() => {
                  alert("Information updated successfully!");
                  navigation.navigate("Home");
                })
                .catch((error) => {
                  setErrorMessage(error.message);
                });
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("No user signed in");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectPicture}>
        <Avatar
          style={styles.profilePicture}
          rounded
          source={{
            uri:
              auth?.currentUser?.photoURL || "https://i.imgur.com/7k12EPD.png",
          }}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSignOut} onPress={signOutUser}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#EAFDFC",
  },
  input: {
    width: "100%",
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  button: {
    width: "40%",
    height: 50,
    backgroundColor: "#70C6C7",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 5,
  },

  buttonSignOut: {
    width: "40%",
    height: 50,
    backgroundColor: "#FC7300",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
  },

  profilePicture: {
    width: 180,
    height: 180,
    marginBottom: 50,
    borderWidth: 3,
    borderColor: "orange",
    borderRadius: 20,
  },
});
