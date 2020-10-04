import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipe: null,
		};
	}

	async componentDidMount() {
		const response = await fetch(
			`https://rso94yuira.execute-api.us-east-1.amazonaws.com/dev/recipes/${this.props.route.params.current}`
		);
		const json = await response.json();
		this.setState({ recipe: json });
	}

	printAndAdd = (x, y) => {
		this.state;
	};

	render() {
		return (
			this.state.recipe && (
				<View style={styles.container}>
					<ScrollView style={styles.scrollview}>
						<Text style={styles.title}>{this.state.recipe.title}</Text>
						<Text style={styles.content}>{this.state.recipe.content}</Text>
						{this.state.recipe.ingredients.map((ingredient) => (
							<Text style={styles.ingredient}>{ingredient}</Text>
						))}
					</ScrollView>
				</View>
			)
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingBottom: 10,
	},
	scrollview: {
		flexDirection: 'column',
		marginLeft: 20,
		marginRight: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		paddingTop: 15,
		paddingBottom: 50,
	},
	content: {
		fontSize: 20,
		paddingBottom: 50,
	},
	ingredient: {
		paddingBottom: 5,
		width: 400,
	},
});
