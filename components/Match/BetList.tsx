import { View } from '@/components/Themed';
import { StyleSheet, ScrollView } from 'react-native';
import PlayerBetList from './PlayerBetList';
import { storageGetItem } from '@/util/Storage';
import todayInTimeFrame from '@/util/inTimeFrame';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

type BetListProps = {

}

const BetList: React.FC<BetListProps> = ({ }) => {
	const match =  useSelector((state: RootState) => state.match.currentMatch);

	if (!match || !match.participants[0] || !match.participants[1]) return (<></>);

	const user_id: Number = Number(storageGetItem('user_id'))

	// Make room on bottom of page for Make Bet Button if applicable
	const loadButton: boolean = match.participants[0].user_id == user_id && todayInTimeFrame(match.start_date, match.end_date) && match.participants[0].credits_remaining > 0
	const listHeight = '90%'
	const listPadding = loadButton
		? 150
		: 100

	const participant1 = user_id == match.participants[1].user_id
		? match.participants[1].user_id
		: match.participants[0].user_id

	const participant1index = user_id == match.participants[1].user_id
		? 1
		: 0

	const participant2 = user_id == match.participants[1].user_id
		? match.participants[0].user_id
		: match.participants[1].user_id

	const participant2index = user_id == match.participants[1].user_id
		? 0
		: 1

	return (
		<View style={[styles.betListContainer, { height: listHeight }]}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: listPadding }}>
				<View style={styles.playerBetListContainer}>
					{/* Player 1 */}
					<PlayerBetList match_id={match.match_id} user_id={participant1} participant_index={participant1index} />

					{/* Player 2 */}
					<PlayerBetList match_id={match.match_id} user_id={participant2} participant_index={participant2index} />
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