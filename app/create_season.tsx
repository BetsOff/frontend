import { Text, useColor, View } from '@/components/Themed';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import axios from 'axios';
import { storageGetItem } from '@/util/Storage';
import { useRouter } from 'expo-router';
import apiRoutes from '@/routes/apiRoutes';
import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSeason } from '@/state/season/SeasonSlice';
import { fetchSeason } from '@/util/fetch/fetchSeasons';

const CreateSeasonScreen = () => {
	const color = useColor();
	const router = useRouter();
	const dispatch = useDispatch();
	const league = useSelector((state: RootState) => state.league.currentLeague);
	const [numMatches, setNumMatches] = useState('');
	const [matchupLength, setMatchupLength] = useState('');
	const [breakLength, setBreakLength] = useState('');
	const [creditsPerMatch, setCreditsPerMatch] = useState('');
	const [teamsInPlayoffs, setTeamsInPlayoffs] = useState('');

	const handleCreateSeason = async () => {
		if (!league) return;

		try {
			const response = await axios.post(apiRoutes.season.create, {
				league: league.id,
				num_matches: Number(numMatches),
				matchup_length: Number(matchupLength),
				break_length: Number(breakLength),
				credits_per_match: Number(creditsPerMatch),
				teams_in_playoffs: Number(teamsInPlayoffs),
			}, {
				headers: {
					'Content-Type': 'application/json',
					'X-Authorization': `Token ${storageGetItem('token')}`
				}
			});

			if (response.status === 201) {
				dispatch(setSeason(await fetchSeason(league)));
				router.replace('/(tabs)/standings')
			}
		} catch (error) {
			console.error('Error creating season: ', error)
		}
	}

	return (
		<View style={styles.container}>
			<View style={[styles.inputView, { borderColor: color.active_text }]}>
				<TextInput
					style={[styles.inputText, { color: color.active_text }]}
					placeholder="Number of Matches"
					placeholderTextColor={color.inactive_text}
					value={numMatches}
					onChangeText={setNumMatches}
				/>
			</View>
			<View style={[styles.inputView, { borderColor: color.active_text }]}>
				<TextInput
					style={[styles.inputText, { color: color.active_text }]}
					placeholder="Matchup Length"
					placeholderTextColor={color.inactive_text}
					value={matchupLength}
					onChangeText={setMatchupLength}
				/>
			</View>
			<View style={[styles.inputView, { borderColor: color.active_text }]}>
				<TextInput
					style={[styles.inputText, { color: color.active_text }]}
					placeholder="Break Length"
					placeholderTextColor={color.inactive_text}
					value={breakLength}
					onChangeText={setBreakLength}
				/>
			</View>
			<View style={[styles.inputView, { borderColor: color.active_text }]}>
				<TextInput
					style={[styles.inputText, { color: color.active_text }]}
					placeholder="Credits Per Match"
					placeholderTextColor={color.inactive_text}
					value={creditsPerMatch}
					onChangeText={setCreditsPerMatch}
				/>
			</View>
			<View style={[styles.inputView, { borderColor: color.active_text }]}>
				<TextInput
					style={[styles.inputText, { color: color.active_text }]}
					placeholder="Teams in Playoffs"
					placeholderTextColor={color.inactive_text}
					value={teamsInPlayoffs}
					onChangeText={setTeamsInPlayoffs}
				/>
			</View>
			<TouchableOpacity style={[styles.button, { backgroundColor: color.brand }]} onPress={handleCreateSeason}>
				<Text style={styles.buttonText}>Create Season</Text>
			</TouchableOpacity>
		</View>
	)
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
	},
});

export default CreateSeasonScreen