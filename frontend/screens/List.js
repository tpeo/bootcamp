import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
  }

  async componentDidMount() {
    const response = await fetch(
      "https://rso94yuira.execute-api.us-east-1.amazonaws.com/dev/recipes"
    );
    const json = await response.json();
    json.sort((a, b) => a.recipe_id > b.recipe_id);
    this.setState({ recipes: json });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ marginTop: 40 }}
          data={this.state.recipes}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", paddingBottom: 35 }}>
              <Text style={styles.recipe_id}> {item.recipe_id} </Text>
              <Button
                onPress={() =>
                  this.props.navigation.push("Recipe", {
                    current: item.recipe_id,
                  })
                }
                title={item.title}
              />
            </View>
          )}
          keyExtractor={(item) => item.recipe_id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  item: {
    padding: 5,
    fontSize: 18,
    height: 44,
  },
  recipe_id: {
    padding: 10,
    width: 50,
    fontSize: 18,
    color: "black",
  },
});
