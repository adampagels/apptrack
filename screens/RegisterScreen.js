import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigateToLoginScreen = () => {
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingMessage}>Sign up to get started!</Text>

      <View style={styles.error}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={name => setName(name)}
            value={name}
          ></TextInput>
        </View>
        <View style={{ marginTop: 32 }}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={email => setEmail(email)}
            value={email}
          ></TextInput>
        </View>
        <View style={{ marginTop: 32 }}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={password => setPassword(password)}
            value={password}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpMessageWrapper}
        onPress={navigateToLoginScreen}
      >
        <Text style={{ color: "#414959", fontSize: 13 }}>
          Already signed up?
          <Text style={{ color: "#5271FF", fontWeight: "500" }}> Login </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  error: {
    color: "#5271FF"
  },
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
