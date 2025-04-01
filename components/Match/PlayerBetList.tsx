import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import BetListForLeague from './BetListForLeague';
import axios from 'axios';
import { useEffect, useState } from 'react';
import apiRoutes from '@/routes/apiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { resetBets, setPlayerOneBets, setPlayerTwoBets } from '@/state/BetSlice';
import { RootState } from '@/state/store';

type PlayerBetListProps = {
	match_id: number;
	user_id: number;
	participant_index: number;
}

const PlayerBetList: React.FC<PlayerBetListProps> = ({ match_id, user_id, participant_index }) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const bets = participant_index === 0
		? useSelector((state: RootState) => state.bet.playerOneBetList)
		: useSelector((state: RootState) => state.bet.playerTwoBetList);

	const fetchData = async () => {
		if (match_id == 0 || user_id == 0) {
			dispatch(resetBets());
			return;
		}
		try {
			const response = await axios.get(apiRoutes.bet.get + `?match_id=${match_id}&user_id=${user_id}`);

			console.log('fetching bets: user:', user_id);
			const _ = participant_index == 0
				? dispatch(setPlayerOneBets(response.data))
				: dispatch(setPlayerTwoBets(response.data))

		} catch (error) {
			console.error('Error fetching data:', error);
			return (
				<View>
					<Text>Not Found</Text>
				</View>
			)
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, [match_id])

	if (loading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	};

	return (
		<View style={styles.playerBetListContainer}>
			{bets.map((bet, index) => (
				<BetListForLeague bets={bet} key={index} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	playerBetListContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginHorizontal: 40,
		width: '30%',
	}
})

export default PlayerBetList;
