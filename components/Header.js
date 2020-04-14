import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as firebase from "firebase/app";

export default function Header() {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const { displayName } = firebase.auth().currentUser;
    setDisplayName(displayName);
  }, []);

  return (
    <View style={styles.header}>
      <Text style={styles.greetingMessage}>Hello, {displayName}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#494E58",
    borderBottomLeftRadius: 90,
    borderTopLeftRadius: 0,
    height: 150,
    overflow: "hidden",
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%",
  },
  greetingMessage: {
    borderBottomLeftRadius: 90,
    color: "#fefefe",
    fontSize: 30,
    fontWeight: "500",
    position: "absolute",
    right: "35%",
    top: "50%",
  },
});
