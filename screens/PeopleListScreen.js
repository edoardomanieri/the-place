import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const PeopleListScreen = ({ navigation, route }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (route.params.inPlace) {
      // get people in place from db
    } else {
      // get people that has joined place from db
    }
  }, []);

  return (
    <View>
      <Text>people list</Text>
    </View>
  );
};

export default PeopleListScreen;

const styles = StyleSheet.create({});
