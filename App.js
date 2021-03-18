import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  Button,
} from "react-native";
import icon from "./assets/icon.png";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.js to start tu working on your app!</Text>
      <Button title={"click me"} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
