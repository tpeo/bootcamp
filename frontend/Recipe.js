import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = { recipes: this.props.recipes };
		this.current = this.props.route.params.current;
	}

	printAndAdd = (x,y) => {
		this.state
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.recipes.map((recipe) => {
					if (recipe.recipe_id.N == this.current) {
						return (
							<View
								style={{
									flexDirection: 'row',
									marginLeft: 20,
									marginRight: 20,
								}}
							>
								<Text style={{ fontSize: 24, fontWeight: 'bold' }}>
									{recipe.title.S}
								</Text>
								<Text style={{ marginLeft: 'auto', fontSize: 20 }}>
									{recipe.content.S}
								</Text>
								<Text style={{ marginLeft: 'auto', fontSize: 20 }}>
									{recipe.ingredients.SS.map((ingredient) => {
										return <Text>{ingredient}</Text>;
									})}
								</Text>
							</View>
						);
					}
				})}
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
