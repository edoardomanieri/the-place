import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          Albert Arms
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Subtitle
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
