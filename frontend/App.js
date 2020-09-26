import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Recipe from './Recipe'

const Stack =  createStackNavigator()

const HomePage = (props) => {
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <TouchableHighlight style={{width: 100, height: 40, backgroundColor: 'black', justifyContent:  'center'}} onPress={()  => props.navigation.navigate('Recipe', {id: 'Me9CpZ5RbSczZw6coJXh'})}>
        <Text style={{color: 'white', textAlign: 'center', textAlignVertical: 'center'}}>Go to Recipe</Text>
      </TouchableHighlight>
    </View>
  );
}

export default class App extends React.Component {

  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Recipe" component={Recipe} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
