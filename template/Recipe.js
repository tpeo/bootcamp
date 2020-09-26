import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import fb from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class Recipe extends React.Component {
	constructor(props) {
		super(props);
        this.state = { users: [] };
        this.id = props.route.params.id;
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.users.map(user => {
					return (
						<View
							style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20 }}
						>
							<Text style={{ fontSize: 24, fontWeight: 'bold' }}>
								{user.name}
							</Text>
							<Text style={{ marginLeft: 'auto', fontSize: 20 }}>
								{user.email}
							</Text>
						</View>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center'
	}
});
