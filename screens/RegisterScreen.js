import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import * as firebase from "firebase";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const navigateToLoginScreen = () => {
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/authenticationBG.png")}
        style={styles.background}
      />
      <Text style={styles.greetingMessage}>Create{"\n"}Account</Text>

      <View style={styles.error}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, paddingTop: 50 }}
      >
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Username</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(name) => setName(name)}
              value={name}
              autoCorrect={false}
            ></TextInput>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
              value={email}
              autoCorrect={false}
            ></TextInput>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => setPassword(password)}
              value={password}
              autoCorrect={false}
            ></TextInput>
          </View>
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpMessageWrapper}
        onPress={navigateToLoginScreen}
      >
        <Text style={{ color: "#414959", fontSize: 13 }}>
          Already signed up?
          <Text style={{ color: "#58C0E6", fontWeight: "500" }}> Login </Text>
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
    color: "#fefefe",
    fontSize: 40,
    marginLeft: 80,
    marginTop: 140,
    marginBottom: 0,
    textAlign: "left",
  },
  form: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 120,
    marginBottom: 47,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    color: "#FEB047",
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
    backgroundColor: "#494E58",
    borderRadius: 50,
    justifyContent: "center",
    height: 50,
    marginHorizontal: 80,
  },
  buttonText: {
    color: "#fefefe",
    fontWeight: "500",
  },
  signUpMessageWrapper: {
    alignSelf: "center",
    marginBottom: 50,
    marginTop: 32,
  },
});
