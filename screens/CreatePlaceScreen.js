import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { db, auth } from "../firebase";
import * as Crypto from "expo-crypto";
import * as firebase from "firebase";

const CreatePlaceScreen = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placePassword, setPlacePassword] = useState("");
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const updateDB = async () => {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      placePassword
    );

    await db
      .collection("places")
      .doc(placeName)
      .set({
        creatorEmail: auth.currentUser.email,
        address: address,
        password: digest,
      })
      .catch((error) => alert(error.message));

    await db
      .collection("places")
      .doc(placeName)
      .collection("joiners")
      .doc(auth.currentUser.displayName)
      .set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        email: auth.currentUser.email,
      })
      .catch((error) => alert(error.message));

    await db
      .collection("userPlaces")
      .doc(auth.currentUser.displayName)
      .collection("places")
      .doc(placeName)
      .set({
        address: address,
      })
      .then(() => navigation.goBack())
      .catch((error) => alert(error.message));
  };

  const createPlace = () => {
    db.collection("places")
      .doc(placeName)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          alert("Please choose another name");
        } else {
          updateDB();
        }
      });
  };

  const getLocation = () => {
    Location.geocodeAsync(address).then((locations) => {
      setRegion({
        latitude: locations[0].latitude,
        longitude: locations[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create New Place",
    });
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Address"
          autoFocus
          type="Text"
          values={address}
          onChangeText={(text) => {
            setAddress(text);
          }}
          onSubmitEditing={getLocation}
        />
        <MapView style={styles.map} region={region} />

        <Input
          placeholder="Enter place name"
          type="Text"
          values={placeName}
          onChangeText={(text) => {
            setPlaceName(text);
          }}
        />
        <Input
          placeholder="Enter place password"
          type="password"
          secureTextEntry
          values={placePassword}
          onChangeText={(text) => {
            setPlacePassword(text);
          }}
        />
      </View>
      <Button
        raised
        onPress={createPlace}
        containerStyle={styles.button}
        type="outline"
        title="Create Place"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default CreatePlaceScreen;

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
    marginBottom: 20,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
