import React, { useEffect } from "react";

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./../redux/actions/user";

export default function LoadingScreen(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      props.navigation.navigate(user ? "App" : "Auth");
      if (user) {
        if (user.displayName !== null) {
          dispatch(setUser(user.displayName));
        }
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
