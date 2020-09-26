import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableHighlight } from 'react-native-gesture-handler';


export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<View
					style={{
						flex: 2,
						marginLeft: 8,
						height: 200,
						width: 200,
						borderRadius: 100,
					}}
				>
					<Image
						source={require('./assets/me_copy.jpg')}
						style={{ height: 200, width: 200, borderRadius: 100 }}
					/>
				</View>
				<View style={styles.title}>
					<Text>Hi my name is Neil and I like cooking!</Text>
				</View>
				<View>
					<TouchableHighlight
						style={{
							width: 100,
							height: 40,
							backgroundColor: 'black',
							justifyContent: 'center',
							borderRadius: 40
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
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'lightblue',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 100,
	},
	title: {
		flex: 3,
	},
});
