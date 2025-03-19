import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import BetListForLeague from './BetListForLeague';
import axios from 'axios';
import api from '../../api_url.json'
import { useEffect, useState } from 'react';
import { usePlayerOneBetListContext } from '../../context/usePlayerOneBetListContext';
import { usePlayerTwoBetListContext } from '../../context/usePlayerTwoBetListContext';

type PlayerBetListProps = {
	match_id: number;
	user_id: number;
	participant_index: number;
}

const PlayerBetList: React.FC<PlayerBetListProps> = ({ match_id, user_id, participant_index }) => {
	const [loading, setLoading] = useState(true);
	const [bets, setBets] = useState([]);
	const { setPlayerOneBetList } = usePlayerOneBetListContext();
	const { setPlayerTwoBetList } = usePlayerTwoBetListContext();

	const fetchData = async () => {
		if (match_id == 0 || user_id == 0) {
			setBets([]);
			return;
		}
		try {
			const fullUrl: string = `${api['url']}/bets/get/?match_id=${match_id}&user_id=${user_id}`;
			const response = await axios.get(fullUrl);

			setBets(response.data);
			const _ = participant_index == 0
				? setPlayerOneBetList(response.data)
				: setPlayerTwoBetList(response.data)

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