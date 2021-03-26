import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import CreatePlaceScreen from "./screens/CreatePlaceScreen";
import JoinPlaceScreen from "./screens/JoinPlaceScreen";
import PlaceScreen from "./screens/PlaceScreen";
import PeopleListScreen from "./screens/PeopleListScreen";
import PlaceProvider from "./context/PlaceContext";

const Stack = createStackNavigator();

const globalOptionsScreen = {
  headerStyle: { backgroundColor: "#F33712" },
  headerTitleSyle: { color: "white" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <PlaceProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalOptionsScreen}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreatePlace" component={CreatePlaceScreen} />
          <Stack.Screen name="JoinPlace" component={JoinPlaceScreen} />
          <Stack.Screen name="Place" component={PlaceScreen} />
          <Stack.Screen name="PeopleList" component={PeopleListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlaceProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
