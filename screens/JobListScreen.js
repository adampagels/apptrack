import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function JobListScreen() {
  return (
    <View style={styles.container}>
      <Text>JobList Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
