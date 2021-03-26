import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { PlaceContext } from "../context/PlaceContext";
import { MaterialIcons } from "@expo/vector-icons";

const CustomListPlaceItem = ({ placeName, placeAddress, goToPlace }) => {
  const { currentPlace } = useContext(PlaceContext);
  return (
    <ListItem
      onPress={() => goToPlace(placeName)}
      key={placeName}
      bottomDivider
    >
      {placeName === currentPlace ? (
        <MaterialIcons name="done-outline" size={24} color="black" />
      ) : (
        <></>
      )}
      <ListItem.Content
        style={{ marginLeft: placeName === currentPlace ? 0 : 24 }}
      >
        <ListItem.Title style={{ fontWeight: "800" }}>
          {placeName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {placeAddress}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default CustomListPlaceItem;

const styles = StyleSheet.create({});
