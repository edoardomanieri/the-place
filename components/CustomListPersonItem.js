import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const CustomListPersonItem = ({ name, email }) => {
  return (
    <ListItem key={name} bottomDivider>
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>{name}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {email}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListPersonItem;

const styles = StyleSheet.create({});
