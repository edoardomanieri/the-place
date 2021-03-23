import React, { useLayoutEffect, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomListPlaceItem from "../components/CustomListPlaceItem";
import { auth, db } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-elements";

const HomeScreen = ({ navigation }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("userPlaces")
      .doc(auth.currentUser.displayName)
      .collection("places")
      .onSnapshot((snapshot) =>
        setPlaces(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  }, []);

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const joinPlace = () => {
    navigation.navigate("JoinPlace");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ThePlace",
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View
          style={{
            marginLeft: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("CreatePlace")}
          >
            <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const goToPlace = (id, placeName) => {
    navigation.navigate("Place", {
      id,
      placeName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollContainer}>
        {places.map(({ id, data: { name, address } }) => (
          <CustomListPlaceItem
            key={id}
            id={id}
            placeName={name}
            placeAddress={address}
            goToPlace={goToPlace}
          />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Join a place"
          containerStyle={styles.button}
          type="outline"
          raised
          onPress={joinPlace}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    height: "90%",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    width: 200,
  },
});
