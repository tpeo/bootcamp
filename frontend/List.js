import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableHighlight } from 'react-native-gesture-handler';

const map = '';

export default class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: [
				{ key: 'Home' },
				{ key: 'Spaghetti' },
				{ key: 'Pasta' },
				{ key: 'Sandwich' },
				{ key: 'James' },
				{ key: 'Joel' },
				{ key: 'John' },
				{ key: 'Jillian' },
				{ key: 'Jimmy' },
				{ key: 'Julie' },
			],
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.recipes}
					renderItem={({ item }) => (
						<View>
							<Text>{item.key}</Text>
							<Button
								onPress={() =>
									this.props.navigation.push('Recipe', {
										current: item.key,
									})
								}
								title="hello"
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
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
});
