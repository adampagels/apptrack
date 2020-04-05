import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Fire from "../Fire";

export default function AddJobScreen() {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [wage, setWage] = useState("");
  const [location, setLocation] = useState("");

  const handleJob = () => {
    Fire.shared.addJob(companyName, jobTitle, wage, location, false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Company</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(companyName) => setCompanyName(companyName)}
            value={companyName}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Job Title</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(jobTitle) => setJobTitle(jobTitle)}
            value={jobTitle}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Wage</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(wage) => setWage(wage)}
            value={wage}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Location</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(location) => setLocation(location)}
            value={location}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleJob}>
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
