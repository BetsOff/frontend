import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import ScoreCard from './ScoreCard';
import { usePlayerOneBetListContext } from '../../context/usePlayerOneBetListContext';
import { usePlayerTwoBetListContext } from '../../context/usePlayerTwoBetListContext';
import { storageGetItem } from '@/util/Storage';
import { useEffect } from 'react';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

type PlayerVsPlayerProps = {

}

const PlayerVsPlayerHeader: React.FC<PlayerVsPlayerProps> = ({ }) => {
	const { currentMatch, matches } =  useSelector((state: RootState) => state.match);
	const { playerOneBetList } = usePlayerOneBetListContext();
	const { playerTwoBetList } = usePlayerTwoBetListContext();

	useEffect(() => { }, [matches]);

	if (!currentMatch || !currentMatch.participants || !currentMatch.participants[0] || !currentMatch.participants[1]) return (<></>);

	const user_id: Number = Number(storageGetItem('user_id'))

	const participant1: MatchParticipant = user_id == currentMatch.participants[1].user_id
		? currentMatch.participants[1]
		: currentMatch.participants[0]

	const participant2: MatchParticipant = user_id == currentMatch.participants[1].user_id
		? currentMatch.participants[0]
		: currentMatch.participants[1]

	return (
		<View style={styles.container}>
			<ScoreCard
				name={participant1.user}
				player_color={participant1.color}
				record={participant1.record}
				score={participant1.score}
				credits_remaining={participant1.credits_remaining}
				betList={playerOneBetList}
			/>
			<Text style={styles.versus}>VS</Text>
			<ScoreCard
				name={participant2.user}
				player_color={participant2.color}
				record={participant2.record}
				score={participant2.score}
				credits_remaining={participant2.credits_remaining}
				betList={playerTwoBetList}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'space-between',
		alignItems: 'center',
		width: '90%',
		margin: 15
	},
	versus: {
		fontSize: 20,
		fontWeight: 500,
	}
})

export default PlayerVsPlayerHeader