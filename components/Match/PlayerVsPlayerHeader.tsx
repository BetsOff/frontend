import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import ScoreCard from './ScoreCard';
import { storageGetItem } from '@/util/Storage';
import { useEffect } from 'react';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { useMatches, useSelectedMatch } from '@/api/matchQueries';
import { useMatchSelector } from '@/state/MatchSlice';

type PlayerVsPlayerProps = {

}

const PlayerVsPlayerHeader: React.FC<PlayerVsPlayerProps> = ({ }) => {
	const { data: matches } = useMatches();
	const { matchId } = useMatchSelector();
	const { data: matchInfo} = useSelectedMatch(matchId);
	const { playerOneBetList, playerTwoBetList } = useSelector((state: RootState) => state.bet);

	const creditsRemaining = playerOneBetList.reduce((leagueTotal, league) => {
		return leagueTotal + league.games.reduce((gameTotal, game) => {
			return gameTotal + game.wagers.reduce((wagerTotal, wager) => wagerTotal + wager.wager, 0);
		}, 0);
	}, 0);

	useEffect(() => { }, [matches, playerOneBetList]);

	if (!matches) return;

	const currentMatch = matchInfo.matches[0];
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
				user_id={participant1.user_id}
				name={participant1.user}
				logo={participant1.logo}
				record={participant1.record}
				score={participant1.score}
				credits_remaining={matches.starting_credits - creditsRemaining}
				betList={playerOneBetList}
			/>
			<Text style={styles.versus}>VS</Text>
			<ScoreCard
				user_id={participant2.user_id}
				name={participant2.user}
				logo={participant2.logo}
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