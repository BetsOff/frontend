import { Text, useColor, View } from '@/components/Themed';
import axios from 'axios';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { storageGetItem } from '@/util/Storage';
import { useRouter } from 'expo-router';
import apiRoutes from '@/routes/apiRoutes';
import { useInvalidateLeagues, useLeagues } from '@/api/leagueQueries';

const CreateLeagueScreen = () => {
	const color = useColor();
	const router = useRouter();
	const [name, setName] = useState('');
	const [maxPlayers, setMaxPlayers] = useState('');
	const invalidateLeagues = useInvalidateLeagues();
	const { refetch } = useLeagues();

	const handleCreateLeague = async () => {
    try {
			const response = await axios.post(apiRoutes.league.create, {
				name: name,
				max_players: maxPlayers,
			}, {
				headers: {
					'Content-Type': 'application/json',
					'X-Authorization': `Token ${storageGetItem('token')}`
				}
			});

			if (response.status === 201) {
				invalidateLeagues();
				router.replace('/(tabs)/standings');
				refetch();
			}
    } catch (error) {
			console.error('Error creating league: ', error);
    } finally {
			setName('');
			setMaxPlayers('');
    }
	}

	return (
		<SafeAreaView style={{flex: 1}}>
			<KeyboardAvoidingView style={[styles.container, {
				backgroundColor: '',
				flex: 1,
				}]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={[styles.inputView, {borderColor: color.active_text}]}>
					<TextInput
						style={[styles.inputText, {color: color.active_text}]}
						placeholder="League Name"
						placeholderTextColor={color.inactive_text}
						value={name}
						onChangeText={setName}
					/>
				</View>
				<View style={[styles.inputView, {borderColor: color.active_text}]}>
					<TextInput
						style={[styles.inputText, {color: color.active_text}]}
						placeholder="League Name"
						placeholderTextColor={color.inactive_text}
						value={name}
						onChangeText={setName}
					/>
				</View>
				<View style={[styles.inputView, {borderColor: color.active_text}]}>
					<TextInput
						style={[styles.inputText, {color: color.active_text}]}
						placeholder="League Name"
						placeholderTextColor={color.inactive_text}
						value={name}
						onChangeText={setName}
					/>
				</View>
				<View style={[styles.inputView, {borderColor: color.active_text}]}>
					<TextInput
						style={[styles.inputText, {color: color.active_text}]}
						placeholder="League Name"
						placeholderTextColor={color.inactive_text}
						value={name}
						onChangeText={setName}
					/>
				</View>
				<View style={[styles.inputView, {borderColor: color.active_text}]}>
					<TextInput
						style={[styles.inputText, {color: color.active_text}]}
						placeholder="League Name"
						placeholderTextColor={color.inactive_text}
						value={name}
						onChangeText={setName}
					/>
				</View>
				<View style={[styles.inputView, {borderColor: color.active_text}]}>
					<TextInput
						style={[styles.inputText, {color: color.active_text}]}
						placeholder="League Name"
						placeholderTextColor={color.inactive_text}
						value={name}
						onChangeText={setName}
					/>
				</View>
				<View style={[styles.inputView, {borderColor: color.active_text}]}>
					<TextInput
						style={[styles.inputText, {color: color.active_text}]}
						placeholder="League Name"
						placeholderTextColor={color.inactive_text}
						value={name}
						onChangeText={setName}
					/>
				</View>
				<View style={[styles.inputView, {borderColor: color.active_text}]}>
					<TextInput
						style={[styles.inputText, {color: color.active_text}]}
						placeholder="League Name"
						placeholderTextColor={color.inactive_text}
						value={name}
						onChangeText={setName}
					/>
				</View>
				<TouchableOpacity style={[styles.button, {backgroundColor: color.brand}]} onPress={handleCreateLeague}>
					<Text style={styles.buttonText}>Create League</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: 20,
	},
	inputView: {
		width: '80%',
		borderRadius: 25,
		height: 50,
		marginBottom: 20,
		justifyContent: 'center',
		padding: 20,
		borderWidth: 1,
	},
	inputText: {
		height: 50,
	},
	button: {
		width: '80%',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
	},
	buttonText: {
		fontSize: 20,
	},
});

export default CreateLeagueScreen;