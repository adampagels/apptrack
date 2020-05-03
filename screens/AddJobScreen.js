import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
} from "react-native";
import "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { addJob } from "./../redux/actions/job";
import Button from "../components/Button";

function AddJobScreen(props) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [wage, setWage] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const addJob = () => {
    props.addJob({
      companyName: companyName,
      jobTitle: jobTitle,
      wage: wage,
      city: city,
      country: country,
    });
    navigateToHome();
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const navigateToHome = () => {
    props.navigation.navigate("Home");
  };

  const moveAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnimation, {
          toValue: 10,
          duration: 800,
        }),
        Animated.timing(moveAnimation, {
          toValue: 0,
          duration: 800,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/addJobBG.png")}
        style={styles.background}
      />
      <Animated.View style={{ transform: [{ translateY: moveAnimation }] }}>
        <View style={styles.downArrow}>
          <Ionicons name="ios-arrow-down" size={30} color={"#fefefe"} />
        </View>
      </Animated.View>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Company</Text>
          <TextInput
            style={styles.input}
            onChangeText={(companyName) => setCompanyName(companyName)}
            value={companyName}
            maxLength={20}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Job Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(jobTitle) => setJobTitle(jobTitle)}
            value={jobTitle}
            maxLength={20}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Wage</Text>
          <TextInput
            style={styles.input}
            onChangeText={(wage) => setWage(wage.replace(/[^0-9]/g, ""))}
            value={wage}
            keyboardType={"numeric"}
            maxLength={7}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>City</Text>
          <TextInput
            style={styles.input}
            onChangeText={(city) => setCity(city)}
            value={city}
            maxLength={20}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Country</Text>
          <TextInput
            style={styles.input}
            onChangeText={(country) => setCountry(country)}
            value={country}
            maxLength={20}
          ></TextInput>
        </View>
      </View>

      <Button text={"Add Job"} onPress={addJob} />
    </SafeAreaView>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addJob: (job) => {
      dispatch(addJob(job));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddJobScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: "220%",
    position: "absolute",
    resizeMode: "contain",
    right: -0,
    top: -550,
    width: "140%",
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#494E58",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    color: "#494E58",
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 15,
    height: 40,
  },
  inputWrapper: {
    marginTop: 32,
  },
  downArrow: {
    alignItems: "center",
    borderRadius: 16,
    height: 40,
    justifyContent: "center",
    left: 168,
    position: "absolute",
    top: -10,
    width: 40,
  },
});
