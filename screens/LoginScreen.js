import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as firebase from "firebase";

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setErrorMessage(error.message));
  };

  const navigateToRegisterScreen = () => {
    props.navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/authenticationBG.png")}
        style={styles.background}
      />
      <Text style={styles.greetingMessage}>Welcome{"\n"}Back</Text>

      <View style={styles.error}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
            value={email}
          ></TextInput>
        </View>
        <View style={styles.passwordWrapper}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            value={password}
          ></TextInput>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpMessageWrapper}
        onPress={navigateToRegisterScreen}
      >
        <Text style={{ color: "#414959", fontSize: 13 }}>
          New to App Track?
          <Text style={{ color: "#5271FF", fontWeight: "500" }}> Sign Up </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  error: {
    color: "#5271FF",
  },
  background: {
    height: "220%",
    position: "absolute",
    resizeMode: "contain",
    right: -60,
    top: -640,
    width: "140%",
  },
  greetingMessage: {
    color: "white",
    fontSize: 40,
    marginLeft: 80,
    marginTop: 170,
    textAlign: "left",
  },
  form: {
    marginTop: 200,
    marginBottom: 40,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    color: "#333",
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 15,
    height: 40,
  },
  passwordWrapper: {
    marginTop: 32,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#5271FF",
    borderRadius: 4,
    justifyContent: "center",
    height: 50,
    marginHorizontal: 30,
  },
  buttonText: {
    color: "#fefefe",
    fontWeight: "500",
  },
  signUpMessageWrapper: {
    alignSelf: "center",
    marginTop: 32,
  },
});
