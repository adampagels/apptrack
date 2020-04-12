import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
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
    <View style={styles.container}>
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
      <View style={styles.header}>
        <Text style={styles.greetingMessage}>Hello, {displayName}!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
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
  listContainer: {
    flex: 1,
    marginTop: 130,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  list: {
    borderRadius: 15,
    flex: 1,
    height: 200,
    marginBottom: 30,
    marginTop: 50,
    width: 300,
  },
  role: {
    color: "#Fefefe",
    flexWrap: "wrap",
    fontSize: 18,
    fontWeight: "800",
    left: 30,
    position: "absolute",
    textTransform: "uppercase",
    top: 25,
    width: "300%",
  },
  company: {
    color: "#fefefe",
    flexWrap: "wrap",
    fontSize: 14,
    fontWeight: "800",
    left: 40,
    opacity: 1,
    position: "absolute",
    textTransform: "uppercase",
    top: 60,
    width: "300%",
  },
  background: {
    backgroundColor: "transparent",
    borderRadius: 15,
    height: 200,
    overflow: "hidden",
    position: "absolute",
    resizeMode: "contain",
    width: "100%",
  },

  wage: {
    color: "#FEB047",
    left: 30,
    position: "absolute",
    top: 150,
  },
  location: {
    color: "#fefefe",
    position: "absolute",
    right: 30,
    top: 150,
  },
});
