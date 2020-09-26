import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = { recipes: this.props.recipes };
		recipes = this.props.recipes
		current = this.props.route.params.current;
	}

	render() {
		return (
			<View style={styles.container}>
				{
					recipes.map((recipe) => {
						if (recipe.key == current) {
							return (
								<View
									style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20 }}
								>
									<Text style={{ fontSize: 24, fontWeight: 'bold' }}>
										{recipe.title}
									</Text>
									<Text style={{ marginLeft: 'auto', fontSize: 20 }}>
										{recipe.content}
									</Text>
									<Text style={{ marginLeft: 'auto', fontSize: 20 }}>
										{
											recipe.ingredients.map((ingredient) => {
												return (<Text>{ingredient}</Text>)
											})
										}
									</Text>
								</View>
							);
						}
					})
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
});
