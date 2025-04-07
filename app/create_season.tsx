import { Text, useColor, View } from '@/components/Themed';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import axios from 'axios';
import { storageGetItem } from '@/util/Storage';
import { useRouter } from 'expo-router';
import apiRoutes from '@/routes/apiRoutes';
import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSeason } from '@/state/SeasonSlice';
import { fetchSeason } from '@/util/fetch/fetchSeasons';
import { useSelectedLeague } from '@/api/leagueQueries';
import { useSeasons } from '@/api/seasonQueries';

const CreateSeasonScreen = () => {
	const color = useColor();
	const router = useRouter();
	const dispatch = useDispatch();
	const { data: league } = useSelectedLeague();
	const [numMatches, setNumMatches] = useState('');
	const [matchupLength, setMatchupLength] = useState('');
	const [breakLength, setBreakLength] = useState('');
	const [creditsPerMatch, setCreditsPerMatch] = useState('');
	const [teamsInPlayoffs, setTeamsInPlayoffs] = useState('');
	const [numBots, setNumBots] = useState('');
	const { refetch } = useSeasons();

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
				num_bots: Number(numBots),
			}, {
				headers: {
					'Content-Type': 'application/json',
					'X-Authorization': `Token ${storageGetItem('token')}`
				}
			});

			if (response.status === 201) {
				dispatch(setSeason(await fetchSeason(league)));
				refetch();
				router.back();
			}
		} catch (error) {
			console.error('Error creating season: ', error)
		}
	}

	return (
		<View style={styles.container}>
			<Text>Number of Matches</Text>
			<View style={[styles.inputView, { borderColor: color.active_text }]}>
				<TextInput
					style={[styles.inputText, { color: color.active_text }]}
					placeholder="10"
					placeholderTextColor={color.inactive_text}
					value={numMatches}
					onChangeText={setNumMatches}
					keyboardType='numeric'
				/>
			</View>

			<Text>Matchup Length in Days</Text>
			<View style={[styles.inputView, { borderColor: color.active_text }]}>
				<TextInput
					style={[styles.inputText, { color: color.active_text }]}
					placeholder="1"
					placeholderTextColor={color.inactive_text}
					value={matchupLength}
					onChangeText={setMatchupLength}
					keyboardType='numeric'
				/>
			</View>

			<Text>Number of Teams in Playoffs</Text>
			<View style={[styles.inputView, { borderColor: color.active_text }]}>
				<TextInput
					style={[styles.inputText, { color: color.active_text }]}
					placeholder="4"
					placeholderTextColor={color.inactive_text}
					value={teamsInPlayoffs}
					onChangeText={setTeamsInPlayoffs}
					keyboardType='numeric'
				/>
			</View>

			<Text>Number of Bots</Text>
			<View style={[styles.inputView, { borderColor: color.active_text }]}>
				<TextInput
					style={[styles.inputText, { color: color.active_text }]}
					placeholder="0"
					placeholderTextColor={color.inactive_text}
					value={numBots}
					onChangeText={setNumBots}
					keyboardType='numeric'
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