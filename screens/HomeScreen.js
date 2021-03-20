import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomListItem from "../components/CustomListItem";
import { auth } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
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
            onPress={() => navigation.navigate("AddPlace")}
          >
            <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
