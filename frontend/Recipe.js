import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = { recipes: this.props.recipes };
		this.current = this.props.route.params.current;
	}

	printAndAdd = (x, y) => {
		this.state;
	};

	render() {
		return (
			<View style={styles.container}>
				{this.state.recipes.map((recipe) => {
					if (recipe.recipe_id.N == this.current) {
						return (
							<View
								style={{
									flexDirection: 'column',
									marginLeft: 20,
									marginRight: 20,
								}}
							>
								<ScrollView>
									<Text
										style={{
											fontSize: 24,
											fontWeight: 'bold',
											paddingBottom: 100,
										}}
									>
										{recipe.title.S}
									</Text>

									<Text
										style={{
											marginLeft: 'auto',
											fontSize: 20,
											paddingBottom: 50,
										}}
									>
										{recipe.content.S}
									</Text>
									<Text
										style={{ marginLeft: 'auto', fontSize: 20, padding: 50 }}
									>
										{recipe.ingredients.SS.map((ingredient) => {
											return (
												<View style={{ padding: 15, width: 400 }}>
													<Text>{ingredient}</Text>
												</View>
											);
										})}
									</Text>
								</ScrollView>
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
