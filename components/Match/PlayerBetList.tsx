import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import BetListForLeague from './BetListForLeague';
import axios from 'axios';
import { useEffect, useState } from 'react';
import apiRoutes from '@/routes/apiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { PlayerIndex, useBets } from '@/api/betQueries';

type PlayerBetListProps = {
	participant_index: PlayerIndex;
}

const PlayerBetList: React.FC<PlayerBetListProps> = ({ participant_index }) => {
	const dispatch = useDispatch();
	const { data: bets, isLoading } = useBets(participant_index);

	if (!bets) return (<></>)

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	};

	return (
		<View style={styles.playerBetListContainer}>

			{bets!.map((bet, index) => (
				<BetListForLeague participant_index={participant_index} bets={bet} key={index} />
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
