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
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./../redux/actions/user";
import { NavigationEvents } from "react-navigation";
import Button from "../components/Button";

export default function RegisterScreen(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(setUser(username));
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const navigateToLoginScreen = () => {
    props.navigation.navigate("Login");
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={navigateToLoginScreen}
      >
        <Ionicons name="ios-arrow-back" size={30} color={"#fefefe"} />
      </TouchableOpacity>
      <Text style={styles.greetingMessage}>Create{"\n"}Account</Text>

      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, paddingTop: 50 }}
      >
        <View style={styles.form}>
          <View>
            {errorMessage && (
              <Text
                style={
                  errorMessage.length < 41 ? styles.error : styles.longError
                }
              >
                {errorMessage}
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.inputTitle}>Username</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(username) => setUsername(username)}
              value={username}
              autoCorrect={false}
              onFocus={resetErrorMessage}
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
              onFocus={resetErrorMessage}
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
              onFocus={resetErrorMessage}
            ></TextInput>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Button text={"Sign Up"} onPress={handleRegister} />

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
  signUpMessageWrapper: {
    alignSelf: "center",
    marginBottom: 50,
    marginTop: 32,
  },
  backButton: {
    alignItems: "center",
    borderRadius: 16,
    height: 40,
    justifyContent: "center",
    left: 12,
    position: "absolute",
    top: 50,
    width: 40,
  },
});
