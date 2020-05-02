import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as firebase from "firebase/app";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

function Header(props) {
  const logOutUser = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="account-circle"
          size={40}
          style={styles.accountIcon}
        />
        <Text style={styles.username}>{props.user}</Text>
        <TouchableOpacity onPress={logOutUser} style={styles.logOutButton}>
          <SimpleLineIcons
            name="logout"
            size={33}
            style={{ color: "#fefefe" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = ({ userReducer: { user } }) => {
  return {
    user,
  };
};

const styles = StyleSheet.create({
  container: {
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
  username: {
    color: "#fefefe",
    fontSize: 30,
    fontWeight: "500",
    marginLeft: 80,
  },
  accountIcon: {
    color: "#fefefe",
    position: "absolute",
    left: 30,
  },
  header: {
    marginTop: 70,
  },
  logOutButton: {
    position: "absolute",
    right: 30,
  },
});

export default connect(mapStateToProps)(Header);
