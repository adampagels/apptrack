import React from "react";
import { View, Text, StyleSheet } from "react-native";
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

  return (
    <View style={styles.container}>
      <Text style={styles.jobsAdded}>Email</Text>
      <Text style={styles.jobsAdded}>{userEmail}</Text>

      <Text style={styles.jobsAdded}>Registered on</Text>
      <Text style={styles.jobsAdded}>{userCreationDate}</Text>

      <Text style={styles.jobsAdded}>Jobs Added</Text>
      <Text style={styles.jobsAdded}>{props.jobs.length}</Text>

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
    alignItems: "flex-start",
    justifyContent: "center",
  },
  jobsAdded: {
    fontSize: 25,
  },
});

export default connect(mapStateToProps, null)(ProfileScreen);
