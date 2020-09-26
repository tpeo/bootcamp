import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableHighlight } from 'react-native-gesture-handler';
import List from './List';
import HomePage from './Home';
import Recipe from './Recipe';

const Stack = createStackNavigator();

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home">
						{(props) => <HomePage {...props} />}
					</Stack.Screen>
					<Stack.Screen name="List">
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
