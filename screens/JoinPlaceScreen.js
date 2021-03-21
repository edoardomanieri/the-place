import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import * as Crypto from "expo-crypto";
import { db } from "../firebase";

const JoinPlaceScreen = () => {
  const [placeName, setPlaceName] = useState("");
  const [placePassword, setPlacePassword] = useState("");

  const join = async () => {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      placePassword
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter place name"
          autofocus
          type="Text"
          value={placeName}
          onChangeText={(text) => setPlaceName(text)}
        />
        <Input
          placeholder="Enter place password"
          type="password"
          secureTextEntry
          value={placePassword}
          onChangeText={(text) => setPlacePassword(text)}
        />
      </View>
      <Button
        containerStyle={styles.button}
        type="outline"
        onPress={join}
        title="Join"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default JoinPlaceScreen;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
});