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
import { NavigationEvents } from "react-navigation";
import Button from "../components/Button";

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

  const resetErrorMessage = () => {
    setErrorMessage(null);
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={resetErrorMessage} />
      <Image
        source={require("../assets/authenticationBG.png")}
        style={styles.background}
      />
      <Text style={styles.greetingMessage}>Welcome{"\n"}Back</Text>

      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, paddingTop: 50 }}
      >
        <View style={styles.form} onPress={resetErrorMessage}>
          <View>
            {errorMessage && (
              <Text
                style={
                  errorMessage.length < 39 ? styles.error : styles.longError
                }
              >
                {errorMessage}
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
              value={email}
              autoCorrect={false}
              onFocus={resetErrorMessage}
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
              autoCorrect={false}
              onFocus={resetErrorMessage}
            ></TextInput>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Button text={"Login"} onPress={handleLogin} />

      <TouchableOpacity
        style={styles.signUpMessageWrapper}
        onPress={navigateToRegisterScreen}
      >
        <Text style={{ color: "#414959", fontSize: 13 }}>
          New to App Track?
          <Text style={{ color: "#58C0E6", fontWeight: "500" }}> Sign Up </Text>
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
    alignSelf: "center",
    color: "#d11a2a",
    fontWeight: "500",
    position: "absolute",
    top: -30,
  },
  longError: {
    alignSelf: "center",
    color: "#d11a2a",
    fontWeight: "500",
    position: "absolute",
    top: -50,
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
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 120,
    marginBottom: 40,
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
  signUpMessageWrapper: {
    alignSelf: "center",
    marginBottom: 120,
    marginTop: 32,
  },
});
