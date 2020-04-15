import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/firestore";

export default function AddJobScreen() {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [wage, setWage] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const addJob = () => {
    firebase
      .firestore()
      .collection("jobs")
      .add({
        companyName: companyName,
        jobTitle: jobTitle,
        wage: wage,
        city: city,
        country: country,
        uid: (firebase.auth().currentUser || {}).uid,
        timestamp: Date.now(),
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Company</Text>
          <TextInput
            style={styles.input}
            onChangeText={(companyName) => setCompanyName(companyName)}
            value={companyName}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Job Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(jobTitle) => setJobTitle(jobTitle)}
            value={jobTitle}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Wage</Text>
          <TextInput
            style={styles.input}
            onChangeText={(wage) => setWage(wage)}
            value={wage}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>City</Text>
          <TextInput
            style={styles.input}
            onChangeText={(city) => setCity(city)}
            value={city}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Country</Text>
          <TextInput
            style={styles.input}
            onChangeText={(country) => setCountry(country)}
            value={country}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={addJob}>
        <Text style={styles.buttonText}>Add Job</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
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
  inputWrapper: {
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
});
