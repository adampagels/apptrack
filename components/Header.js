import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as firebase from "firebase/app";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";

function Header(props) {
  const logOutUser = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.header}>
      <Text style={styles.greetingMessage}>Hello, {props.user}!</Text>
      <TouchableOpacity onPress={logOutUser} style={{ left: 290, top: 72 }}>
        <SimpleLineIcons name="logout" size={40} style={{ color: "#fefefe" }} />
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = ({ userReducer: { user } }) => {
  return {
    user,
  };
};

const styles = StyleSheet.create({
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
});

export default connect(mapStateToProps)(Header);
