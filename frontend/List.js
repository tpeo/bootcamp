import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

export default class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {recipes: this.props.recipes};
		console.log(this.props)
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					style={{ marginTop: 40 }}
					data={this.state.recipes}
					renderItem={({ item }) => (
						<View style={{ marginBottom: 10 }}>
							<Text
								style={{
									padding: 10,
									width: 50,
									fontSize: 18,
									color: 'black',
								}}
							>
								{item.recipe_id.N}
							</Text>
							<Button
								onPress={() =>
									this.props.navigation.push('Recipe', {
										current: item.recipe_id.N,
									})
								}
								title={item.title.S}
							/>
						</View>
					)}
					keyExtractor={(item) => item.recipe_id.N}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'lightblue',
	},
	item: {
		padding: 5,
		fontSize: 18,
		height: 44,
	},
});
