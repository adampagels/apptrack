import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Header from "../components/Header";
import { connect } from "react-redux";
import * as firebase from "firebase/app";

function ProfileScreen(props) {
  const userCreationDate = (
    firebase.auth().currentUser || {}
  ).metadata.creationTime
    .split(" ")
    .splice(1, 3)
    .join(" ");

  const userEmail = (firebase.auth().currentUser || {}).email;

  const deleteJobs = () => {
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

  const deleteJobsAlert = () => {
    Alert.alert(
      "WARNING",
      `This action cannot be undone. \n Press 'Delete' to confirm.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => deleteJobs() },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.userInfoData}>{props.jobs.length}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={deleteJobsAlert}>
          <Text style={styles.buttonText}>Delete all jobs</Text>
        </TouchableOpacity>
      </View>

      <Header />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoTitle: {
    color: "#8A8F9E",
    marginBottom: 5,
    fontSize: 13,
  },
  userInfo: {
    marginHorizontal: 51,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 230,
  },
  userInfoData: {
    fontSize: 20,
    marginBottom: 50,
    color: "#333",
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
  },
});

export default connect(mapStateToProps, null)(ProfileScreen);
