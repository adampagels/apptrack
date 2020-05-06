import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import * as firebase from "firebase/app";

export default function ProfileScreen() {
  const numberOfJobs = useSelector((state) => state.jobReducer.jobs.length);
  const userCreationDate = (
    firebase.auth().currentUser || {}
  ).metadata.creationTime
    .split(" ")
    .splice(1, 3)
    .join(" ");

  const userEmail = (firebase.auth().currentUser || {}).email;

  const deleteAllJobs = () => {
    let userId = (firebase.auth().currentUser || {}).uid;
    firebase
      .firestore()
      .collection("jobs")
      .where("uid", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = () => {
    let userId = firebase.auth().currentUser || {};
    userId.delete().catch((error) => {
      console.log(error);
    });
  };

  const deleteJobsOrUserAlert = (action) => {
    Alert.alert(
      "WARNING",
      `This action cannot be undone. \n Press '${action}' to confirm.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: `${action}`,
          onPress: () => {
            if (action === "Delete") {
              deleteAllJobs();
            } else {
              deleteUser();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/profileBG.png")}
        style={styles.background}
      />
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.userInfoTitle}>Email</Text>
          <Text style={styles.userInfoData}>{userEmail}</Text>
        </View>
        <View>
          <Text style={styles.userInfoTitle}>Registered on</Text>
          <Text style={styles.userInfoData}>{userCreationDate}</Text>
        </View>
        <View>
          <Text style={styles.userInfoTitle}>Current number of jobs</Text>
          <Text style={styles.userInfoData}>{numberOfJobs}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => deleteJobsOrUserAlert("Deactivate")}
        >
          <Text style={styles.buttonText}>Deactivate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => deleteJobsOrUserAlert("Delete")}
        >
          <Text style={styles.buttonText}>Delete all jobs</Text>
        </TouchableOpacity>
      </View>

      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: "220%",
    position: "absolute",
    resizeMode: "contain",
    right: -90,
    top: -380,
    width: "140%",
  },
  userInfoTitle: {
    color: "#494E58",
    marginBottom: 5,
    fontSize: 12,
    opacity: 0.9,
  },
  userInfo: {
    marginHorizontal: 51,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 280,
  },
  userInfoData: {
    fontSize: 20,
    marginBottom: 50,
    color: "#494E58",
    fontWeight: "600",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#d11a2a",
    borderRadius: 50,
    justifyContent: "center",
    height: 50,
    width: 140,
    margin: 20,
  },
  buttonText: {
    color: "#fefefe",
    fontWeight: "500",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
});
