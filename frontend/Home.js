import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableHighlight } from 'react-native-gesture-handler';
import List from './List';

const Drawer = createDrawerNavigator();

export default class HomePage extends React.Component {
	constructor(props) {
        super(props);
        var test = this.props;
        
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Home Page</Text>
				<TouchableHighlight
					style={{
						width: 100,
						height: 40,
						backgroundColor: 'black',
						justifyContent: 'center',
					}}
					onPress={() => this.props.navigation.navigate('List')}
				>
					<Text
						style={{
							color: 'white',
							textAlign: 'center',
							textAlignVertical: 'center',
						}}
					>
						Go to Recipes
					</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
