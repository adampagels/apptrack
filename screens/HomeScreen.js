import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import * as firebase from "firebase/app";
import Header from "../components/Header";
import "firebase/firestore";

export default function HomeScreen() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("jobs")
      .onSnapshot(getJobs);
    return () => unsubscribe();
  }, []);

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
      {jobs.length === 0 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>You haven't added any jobs yet!</Text>
        </View>
      )}
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={item === jobs[0] ? styles.topOfList : styles.list}>
              <ImageBackground
                source={require("../assets/cardBackground.png")}
                style={styles.background}
              >
                <Text style={styles.role}>{item.jobTitle}</Text>
                <Text style={styles.company}>{item.companyName}</Text>
                <Text style={styles.wage}>${item.wage}</Text>
                <Text style={styles.location}>
                  {item.city}, {item.country}
                </Text>
              </ImageBackground>
            </View>
          )}
        />
      </View>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#fefefe",
  },
  listContainer: {
    flex: 1,
    marginTop: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  list: {
    borderRadius: 15,
    flex: 1,
    height: 200,
    marginBottom: 0,
    marginTop: 0,
    width: 300,
    marginHorizontal: 30,
  },
  topOfList: {
    borderRadius: 15,
    flex: 1,
    height: 200,
    marginBottom: 0,
    marginTop: 60,
    width: 300,
    marginHorizontal: 30,
  },
  role: {
    color: "#Fefefe",
    flexWrap: "wrap",
    fontSize: 18,
    fontWeight: "900",
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
    left: 30,
    opacity: 1,
    position: "absolute",
    textTransform: "uppercase",
    top: 60,
    width: "300%",
  },
  background: {
    backgroundColor: "transparent",
    borderRadius: 15,
    height: 170,
    overflow: "hidden",
    position: "absolute",
    resizeMode: "contain",
    width: "100%",
  },

  wage: {
    color: "#FEB047",
    fontWeight: "400",
    left: 30,
    position: "absolute",
    top: 125,
  },
  location: {
    color: "#fefefe",
    fontWeight: "400",
    position: "absolute",
    right: 30,
    top: 125,
  },
});
