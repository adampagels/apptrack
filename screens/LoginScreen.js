import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.greetingMessage}>Welcome Back</Text>

      <View style={styles.errorMessage}>
        <Text>Error</Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput style={styles.input} autoCapitalize="none"></TextInput>
        </View>
        <View style={styles.passwordWrapper}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput style={styles.input} autoCapitalize="none"></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpMessageWrapper}>
        <Text style={{ color: "#414959", fontSize: 13 }}>
          New to AppTrack?{" "}
          <Text style={{ color: "#5271FF", fontWeight: "500" }}> Sign Up </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  errorMessage: {},
  greetingMessage: {
    fontSize: 18,
    marginTop: 32,
    textAlign: "center"
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    color: "#333",
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 15,
    height: 40
  },
  passwordWrapper: {
    marginTop: 32
  },
  button: {
    alignItems: "center",
    backgroundColor: "#5271FF",
    borderRadius: 4,
    justifyContent: "center",
    height: 50,
    marginHorizontal: 30
  },
  buttonText: {
    color: "#fefefe",
    fontWeight: "500"
  },
  signUpMessageWrapper: {
    alignSelf: "center",
    marginTop: 32
  }
});
