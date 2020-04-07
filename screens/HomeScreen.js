import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase/app";
import "firebase/firestore";

export default function HomeScreen() {
  const [displayName, setDisplayName] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const { displayName } = firebase.auth().currentUser;
    setDisplayName(displayName);
    getJobs();
  }, []);

  const logOutUser = () => {
    firebase.auth().signOut();
  };

  const getJobs = () => {
    let jobData = [];
    let userId = (firebase.auth().currentUser || {}).uid;
    firebase
      .firestore()
      .collection("jobs")
      .where("uid", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          jobData.push(doc.data());
        });
        setJobs(jobData);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Hello {displayName}!</Text>

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
    alignItems: "center",
  },
});
