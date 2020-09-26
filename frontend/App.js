import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './List';
import HomePage from './Home';
import Recipe from './Recipe';

const Stack = createStackNavigator();

const table = {
	recipes: [
		{ key: 1,  title: 'Pasta', ingredients: [], content: ''},
		{ key: 2,  title: 'Pasta', ingredients: [], content: '' },
		{ key: 3,  title: 'Pasta', ingredients: [], content: '' },
		{ key: 4,  title: 'Pasta', ingredients: [], content: '' },
		{ key: 5,  title: 'Pasta', ingredients: [], content: '' },
		{ key: 6,  title: 'Pasta', ingredients: [], content: '' },
		{ key: 7,  title: 'Pasta', ingredients: [], content: '' },
		{ key: 8,  title: 'Pasta', ingredients: [], content: '' },
		{ key: 9,  title: 'Pasta', ingredients: [], content: '' },
		{ key: 10,  title: 'Pasta', ingredients: [], content: '' },
	],
};

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
						{props => <List {...props} recipes={table.recipes} />}
					</Stack.Screen>
					<Stack.Screen name="Recipe">
						{(props) => <Recipe {...props} recipes={table.recipes} />}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
