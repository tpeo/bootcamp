import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function HomePage(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={require("../assets/me_copy.jpg")} style={styles.image} />
      </View>
      <View style={styles.title}>
        <Text>Hi my name is Neil and I like cooking!</Text>
      </View>
      <View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => props.navigation.navigate("List")}
        >
          <Text style={styles.buttonText}>Go to Recipes</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    padding: 100,
  },
  title: {
    flex: 3,
  },
  imageView: {
    flex: 2,
    marginLeft: 8,
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "black",
    justifyContent: "center",
    borderRadius: 40,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
