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
    //put in db
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
        <Text h3 style={{ marginTop: 10 }}>
          1 Person
        </Text>
      ) : (
        <Text h3 style={{ marginTop: 10 }}>
          {peopleInPlace.length} People
        </Text>
      )}
      <Button
        onPress={() =>
          navigation.navigate("PeopleList", {
            inPlace: true,
          })
        }
        style={styles.button}
        title="See people in place"
        type="outline"
        raised
      />
      {peopleGeneral.length == 1 ? (
        <Text h3 style={{ marginTop: 20 }}>
          1 Person
        </Text>
      ) : (
        <Text h3 style={{ marginTop: 20 }}>
          {peopleGeneral.length} People
        </Text>
      )}
      <Button
        onPress={() =>
          navigation.navigate("PeopleList", {
            inplace: false,
          })
        }
        style={styles.button}
        title="See people that have joined this place"
        type="outline"
        raised
      />
      {currentPlace === route.params.placeName ? (
        <Button
          onPress={exitPlace}
          style={styles.button}
          title="Exit this place"
          type="outline"
          raised
        />
      ) : currentPlace === "" ? (
        <Button
          onPress={enterPlace}
          style={styles.button}
          title="Enter this place"
          type="outline"
          raised
        />
      ) : null}
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
