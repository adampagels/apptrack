import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from "react-native";
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
    <SafeAreaView style={styles.container}>
      <Text>Hello {displayName}!</Text>
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <ImageBackground
                source={require("../assets/cardBackground.png")}
                style={styles.background}
              >
                <Text style={styles.role}>{item.jobTitle}</Text>
                <Text style={styles.company}>{item.companyName}</Text>
                <Text style={styles.wage}>${item.wage}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </ImageBackground>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  list: {
    flex: 1,
    borderRadius: 15,
    paddingTop: 80,
    width: 300,
    height: 200,
    marginBottom: 30,
  },
  role: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "800",
    position: "absolute",
    left: 30,
    top: 25,
    width: "300%",
    flexWrap: "wrap",
    color: "#Fefefe",
  },
  company: {
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "800",
    position: "absolute",
    left: 40,
    top: 60,
    width: "300%",
    flexWrap: "wrap",
    color: "#fefefe",
    opacity: 1,
  },
  background: {
    height: 200,
    position: "absolute",
    resizeMode: "contain",
    width: "100%",
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: "transparent",
  },

  wage: {
    position: "absolute",
    top: 150,
    left: 30,
    color: "#FEB047",
  },
  location: {
    position: "absolute",
    color: "#fefefe",
    top: 150,
    right: 30,
  },
});
