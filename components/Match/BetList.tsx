import { View } from '@/components/Themed';
import { StyleSheet, ScrollView } from 'react-native';
import PlayerBetList from './PlayerBetList';
import { storageGetItem } from '@/util/Storage';
import todayInTimeFrame from '@/util/inTimeFrame';
import { useSelectedMatch } from '@/api/matchQueries';
import { useMatchSelector } from '@/state/MatchSlice';

type BetListProps = {
	isLoading?: boolean;
}

const BetList: React.FC<BetListProps> = ({
	isLoading = false,
}) => {
	const { data: matchInfo } = useSelectedMatch();

	if (!matchInfo) return (<></>);
	
	const match = matchInfo.matches[0];
	if (!match.participants[0] || !match.participants[1]) return (<></>);

	const user_id: Number = Number(storageGetItem('user_id'))

	// Make room on bottom of page for Make Bet Button if applicable
	const loadButton: boolean = match.participants[0].user_id == user_id && todayInTimeFrame(match.start_date, match.end_date) && match.participants[0].credits_remaining > 0
	const listHeight = '90%'
	const listPadding = loadButton
		? 150
		: 100

	return (
		<View style={[styles.betListContainer, { height: listHeight }]}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: listPadding }}>
				<View style={styles.playerBetListContainer}>
					{/* Player 1 */}
					<PlayerBetList participant_index={0} />

					{/* Player 2 */}
					<PlayerBetList participant_index={1} />
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	betListContainer: {
		flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
	},
	playerBetListContainer: {
		flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
	}
})

export default BetList