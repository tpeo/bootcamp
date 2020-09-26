import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

export default class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		recipes = this.props.recipes;
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					style={{ marginTop: 40 }}
					data={recipes}
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
								{item.key}
							</Text>
							<Button
								onPress={() =>
									this.props.navigation.push('Recipe', {
										current: item.key,
									})
								}
								title={item.title}
							/>
						</View>
					)}
					keyExtractor={(item) => item.key}
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
