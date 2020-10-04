import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import List from "./screens/List";
import HomePage from "./screens/Home";
import Recipe from "./screens/Recipe";

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ title: "Neil's Recipe Book" }}>
            {(props) => <HomePage {...props} />}
          </Stack.Screen>
          <Stack.Screen name="List" options={{ title: "Table of Contents" }}>
            {(props) => <List {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Recipe">
            {(props) => <Recipe {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
