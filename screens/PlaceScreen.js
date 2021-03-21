import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-elements";
import { PlaceContext } from "../contexts/PlaceContext";

const PlaceScreen = ({ navigation, route }) => {
  const [peopleInPlace, setPeopleInPlace] = useState([]);
  const [peopleGeneral, setPeopleGeneral] = useState([]);
  const { currentPlace, setCurrentPlace } = useContext(PlaceContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.placeName,
    });
  }, []);

  const enterPlace = () => {
    // Check that location matches
    //update db
    navigation.goBack();

    setCurrentPlace(route.params.placeName);
  };

  const exitPlace = () => {
    //remove from db
    navigation.goBack();

    setCurrentPlace("");
  };

  return (
    <View style={styles.container}>
      {peopleInPlace.length == 1 ? (
        <Text h4 style={{ marginTop: 10 }}>
          1 Person currently in {route.params.placeName}
        </Text>
      ) : (
        <Text h4 style={{ marginTop: 10 }}>
          {peopleInPlace.length} People currently in {route.params.placeName}
        </Text>
      )}
      <Button
        onPress={() =>
          navigation.navigate("PeopleList", {
            inPlace: true,
          })
        }
        style={styles.button}
        title="Check Them Out"
        type="outline"
        raised
      />
      {peopleGeneral.length == 1 ? (
        <Text h4 style={{ marginTop: 20 }}>
          1 Person follows {route.params.placeName}
        </Text>
      ) : (
        <Text h4 style={{ marginTop: 20 }}>
          {peopleGeneral.length} People follow {route.params.placeName}
        </Text>
      )}
      <Button
        onPress={() =>
          navigation.navigate("PeopleList", {
            inplace: false,
          })
        }
        style={styles.button}
        title="Check Them Out"
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
