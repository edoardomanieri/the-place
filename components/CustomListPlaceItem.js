import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { PlaceContext } from "../contexts/PlaceContext";
import { MaterialIcons } from "@expo/vector-icons";

const CustomListItem = ({ id, placeName, placeAddress, goToPlace }) => {
  const { currentPlace } = useContext(PlaceContext);
  return (
    <ListItem onPress={() => goToPlace(id, placeName)} key={id} bottomDivider>
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

export default CustomListItem;

const styles = StyleSheet.create({});
