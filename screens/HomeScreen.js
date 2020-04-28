import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import * as firebase from "firebase/app";
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "firebase/firestore";
import { connect } from "react-redux";
import { getJob } from "./../redux/app-redux";

function HomeScreen(props) {
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("jobs")
      .onSnapshot(() => {
        props.getJob();
      });
    return () => unsubscribe();
  }, []);

  const deleteJob = (id) => {
    firebase.firestore().collection("jobs").doc(id).delete();
  };

  const navigateToAddJobScreen = () => {
    props.navigation.navigate("AddJob");
  };

  const mostRecentJobs = props.jobs.sort((a, b) => {
    return new Date(b.data.timestamp) - new Date(a.data.timestamp);
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          position: "absolute",
          top: "55%",
        }}
      >
        {props.jobs.length === 0 && (
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            {"No jobs to show"}
          </Text>
        )}
        {props.jobs.length === 0 && (
          <TouchableOpacity
            style={styles.addJobButton}
            onPress={navigateToAddJobScreen}
          >
            <Text style={styles.addJobButtonText}>Add Jobs</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.listContainer}>
        <SwipeListView
          showsVerticalScrollIndicator={false}
          data={mostRecentJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={item === props.jobs[0] ? styles.topOfList : styles.list}
            >
              <ImageBackground
                source={require("../assets/cardBackground.png")}
                style={styles.background}
              >
                <Text style={styles.role}>{item.data.jobTitle.trim()}</Text>
                <Text style={styles.company}>
                  {item.data.companyName.trim()}
                </Text>
                <Text style={styles.wage}>${item.data.wage}</Text>
                <View
                  style={
                    item.data.city.length + item.data.country.length < 24
                      ? styles.location
                      : styles.locationTooLong
                  }
                >
                  {!item.data.city === false && (
                    <Text style={styles.city}>{item.data.city.trim()}, </Text>
                  )}
                  <Text style={styles.country}>{item.data.country.trim()}</Text>
                </View>
              </ImageBackground>
            </View>
          )}
          renderHiddenItem={(data) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => deleteJob(data.item.id)}
            >
              <MaterialCommunityIcons
                name="delete-forever"
                size={25}
                color={"#fefefe"}
              />
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          )}
          rightOpenValue={-150}
        />
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

const mapDispatchToProps = (dispatch) => {
  return {
    getJob: () => {
      dispatch(getJob());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
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
    fontWeight: "700",
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
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    right: 30,
    top: 125,
  },
  city: {
    color: "#fefefe",
  },
  country: {
    color: "#fefefe",
  },
  locationTooLong: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    right: 30,
    top: 125,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#d11a2a",
    borderRadius: 50,
    justifyContent: "center",
    height: 50,
    marginHorizontal: 120,
    alignItems: "center",
    bottom: -55,
    left: 80,
    flexDirection: "row",
  },
  buttonText: {
    color: "#fefefe",
    fontWeight: "500",
  },
  addJobButton: {
    alignItems: "center",
    borderRadius: 50,
    justifyContent: "center",
    height: 50,
    borderWidth: 2,
    borderColor: "#494E58",
    marginTop: 20,
  },
  addJobButtonText: {
    color: "#494E58",
    fontWeight: "500",
  },
});
