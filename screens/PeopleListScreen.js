import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { db, auth } from "../firebase";
import CustomListPersonItem from "../components/CustomListPersonItem";

const PeopleListScreen = ({ route }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    var unsubscribe;
    if (route.params.inPlace) {
      unsubscribe = db
        .collection("places")
        .doc(route.params.placeName)
        .collection("visitors")
        .onSnapshot((snapshot) =>
          setPeople(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      unsubscribe = db
        .collection("places")
        .doc(route.params.placeName)
        .collection("joiners")
        .onSnapshot((snapshot) =>
          setPeople(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollContainer}>
        {people.map(({ id, data: { email } }) =>
          id != auth.currentUser.displayName ? (
            <CustomListPersonItem key={id} name={id} email={email} />
          ) : (
            <></>
          )
        )}
      </ScrollView>
      <View style={styles.buttonContainer}></View>
    </SafeAreaView>
  );
};

export default PeopleListScreen;

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
