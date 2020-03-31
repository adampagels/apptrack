import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const { email, displayName } = firebase.auth().currentUser;

    setEmail(email);
    setDisplayName(displayName);
  }, []);

  const logOutUser = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <Text>Hello {email}!</Text>

      <TouchableOpacity onPress={logOutUser}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
