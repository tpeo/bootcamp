import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './screens/List';
import HomePage from './screens/Home';
import Recipe from './screens/Recipe';

const Stack = createStackNavigator();

const table = {
	recipes: [
		{
			key: 1,
			title: 'Pasta',
			ingredients: ['idk smth else'],
			content: 'smth else',
		},
		{ key: 2, title: 'Pasta', ingredients: [], content: 'new stuff' },
		{ key: 3, title: 'Pasta', ingredients: [], content: '' },
		{ key: 4, title: 'Pasta', ingredients: [], content: '' },
		{ key: 5, title: 'Pasta', ingredients: [], content: '' },
		{ key: 6, title: 'Pasta', ingredients: [], content: '' },
		{ key: 7, title: 'Pasta', ingredients: [], content: '' },
		{ key: 8, title: 'Pasta', ingredients: [], content: '' },
		{ key: 9, title: 'Pasta', ingredients: [], content: '' },
		{ key: 10, title: 'Pasta', ingredients: [], content: '' },
	],
};

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: []
		}
	}

	async componentDidMount() {
		const response = await fetch('https://rso94yuira.execute-api.us-east-1.amazonaws.com/dev/recipes')
		const json = await response.json()
		json.sort((a, b) => (a.recipe_id > b.recipe_id))
		this.setState({recipes: json})
	}

	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" options={{ title: "Neil's Recipe Book" }}>
						{(props) => <HomePage {...props} />}
					</Stack.Screen>
					<Stack.Screen name="List" options={{ title: 'Table of Contents' }}>
						{(props) => <List {...props} recipes={this.state.recipes} />}
					</Stack.Screen>
					<Stack.Screen name="Recipe">
						{(props) => <Recipe {...props} />}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
