import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

export default class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = { recipes: this.props.recipes };
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					style={{ marginTop: 40 }}
					data={this.state.recipes}
					renderItem={({ item }) => (
						<View style={{ flexDirection: 'row', paddingBottom: 35 }}>
							<Text
								style={{
									padding: 10,
									width: 50,
									fontSize: 18,
									color: 'black',
								}}
							>
								{item.recipe_id}
							</Text>
							<Button
								onPress={() =>
									this.props.navigation.push('Recipe', {
										current: item.recipe_id,
									})
								}
								title={item.title}
							/>
						</View>
					)}
					keyExtractor={(item) => item.recipe_id}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
	},
	item: {
		padding: 5,
		fontSize: 18,
		height: 44,
	},
});
