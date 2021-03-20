import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import MapView from "react-native-maps";

const AddPlaceScreen = ({ navigation }) => {
  useLayoutEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
};

export default AddPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 300,
    height: 300,
  },
});
