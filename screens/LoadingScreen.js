import React, { useEffect } from "react";

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { setUser } from "./../redux/app-redux";

function LoadingScreen(props) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      props.navigation.navigate(user ? "App" : "Auth");
      if (user) {
        if (user.displayName !== null) {
          props.setUser(user.displayName);
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
