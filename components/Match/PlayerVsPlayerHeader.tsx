import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import ScoreCard from './ScoreCard';
import { storageGetItem } from '@/util/Storage';
import { useEffect } from 'react';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { useMatches, useSelectedMatch } from '@/api/matchQueries';
import { useMatchSelector } from '@/state/MatchSlice';
import { useBets } from '@/api/betQueries';
import EmptyScoreCard from './EmptyScoreCard';

type PlayerVsPlayerProps = {
	isLoading?: boolean,
}

const PlayerVsPlayerHeader: React.FC<PlayerVsPlayerProps> = ({
	isLoading = false,
}) => {
	const { data: matches } = useMatches();
	const { data: matchInfo} = useSelectedMatch();
	const { data: playerOneBetList } = useBets(0);
	const { data: playerTwoBetList } = useBets(1);

	useEffect(() => { }, [matches, playerOneBetList]);

	if (isLoading) return (
		<View style={styles.container}>
			<EmptyScoreCard />
			<Text style={styles.versus}>VS</Text>
			<EmptyScoreCard />
		</View>
	);

	if (!matches || !matchInfo || !playerOneBetList || !playerTwoBetList) return (<></>);

	const creditsRemaining = playerOneBetList.reduce((leagueTotal, league) => {
		return leagueTotal + league.games.reduce((gameTotal, game) => {
			return gameTotal + game.wagers.reduce((wagerTotal, wager) => wagerTotal + wager.wager, 0);
		}, 0);
	}, 0);

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
				playerIndex={0}
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
				playerIndex={1}
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