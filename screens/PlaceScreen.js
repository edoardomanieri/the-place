import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-elements";
import { PlaceContext } from "../context/PlaceContext";
import { auth, db } from "../firebase";
import * as firebase from "firebase";

const PlaceScreen = ({ navigation, route }) => {
  const [visitors, setVisitors] = useState([]);
  const [joiners, setJoiners] = useState([]);
  const { currentPlace, setCurrentPlace } = useContext(PlaceContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.placeName,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = db
      .collection("places")
      .doc(route.params.placeName)
      .collection("joiners")
      .onSnapshot((snapshot) =>
        setJoiners(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = db
      .collection("places")
      .doc(route.params.placeName)
      .collection("visitors")
      .onSnapshot((snapshot) =>
        setVisitors(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);

  const enterPlace = async () => {
    // Check that location matches
    try {
      await db
        .collection("places")
        .doc(route.params.placeName)
        .collection("visitors")
        .doc(auth.currentUser.displayName)
        .set({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          email: auth.currentUser.email,
        });

      navigation.goBack();

      setCurrentPlace(route.params.placeName);
    } catch (error) {
      alert(error.message);
    }
  };

  const exitPlace = async () => {
    try {
      await db
        .collection("places")
        .doc(route.params.placeName)
        .collection("visitors")
        .doc(auth.currentUser.displayName)
        .delete();

      navigation.goBack();

      setCurrentPlace("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {visitors.length == 1 ? (
        <Text h4 style={{ marginTop: 10 }}>
          1 Person currently in {route.params.placeName}
        </Text>
      ) : (
        <Text h4 style={{ marginTop: 10 }}>
          {visitors.length} People currently in {route.params.placeName}
        </Text>
      )}
      <Button
        onPress={() =>
          navigation.navigate("PeopleList", {
            inPlace: true,
            placeName: route.params.placeName,
          })
        }
        style={styles.button}
        title="Check them out"
        type="outline"
        raised
      />
      {joiners.length == 1 ? (
        <Text h4 style={{ marginTop: 20 }}>
          1 Person follows {route.params.placeName}
        </Text>
      ) : (
        <Text h4 style={{ marginTop: 20 }}>
          {joiners.length} People follow {route.params.placeName}
        </Text>
      )}
      <Button
        onPress={() =>
          navigation.navigate("PeopleList", {
            inplace: false,
            placeName: route.params.placeName,
          })
        }
        style={styles.button}
        title="Check them out"
        type="outline"
        raised
      />
      {currentPlace === route.params.placeName ? (
        <View>
          <Text h4 style={{ marginTop: 20, alignSelf: "center" }}>
            Are you leaving?
          </Text>
          <Button
            onPress={exitPlace}
            style={styles.button}
            title="Exit this place"
            type="outline"
            raised
          />
        </View>
      ) : (
        <View>
          <Text h4 style={{ marginTop: 20, alignSelf: "center" }}>
            Are you currently in {route.params.placeName}?
          </Text>
          <Button
            onPress={enterPlace}
            style={styles.button}
            title="Enter this place"
            type="outline"
            raised
          />
        </View>
      )}
    </View>
  );
};

export default PlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  button: { width: 340, marginTop: 20 },
});
