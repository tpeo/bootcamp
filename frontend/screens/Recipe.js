import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function Recipe(props) {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    content: "",
  });

  const recipeId = props.route.params.current;

  useEffect(() => {
    console.log(`Fetching recipe ${recipeId}`);

    const fetchData = async () => {
      const response = await fetch(
        `https://rso94yuira.execute-api.us-east-1.amazonaws.com/dev/recipes/${recipeId}`
      );
      setRecipe(await response.json());
    };
    fetchData();
  }, [recipeId]);

  var { title, ingredients, content } = recipe;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.ingredient}>{ingredients.join("\n")}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  scrollview: {
    // flexDirection: "column",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 50,
  },
  content: {
    fontSize: 20,
    paddingBottom: 50,
  },
  ingredient: {
    paddingBottom: 5,
  },
});
