import { Text, useColor, View, } from '@/components/Themed';
import { StyleSheet, TextInput } from 'react-native';

import calcualtePointsWon from '@/util/calculatePointsWon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setWager } from '@/state/LineSlice';
import { useSelectedMatch } from '@/api/matchQueries';

type SubmitWagerProps = {
	marketLine: MarketLine | null;
}

const SubmitWager: React.FC<SubmitWagerProps> = ({ marketLine }) => {
	const color = useColor();
	const dispatch = useDispatch();
	const { data: match } = useSelectedMatch();
	const selectedLine = useSelector((state: RootState) => state.line.selectedLine);

	if (!marketLine) return (<></>);

	if (!match) return (<></>);

	if (!selectedLine) return (<></>);

	const currentMatch = match.matches[0];

	const handleSetWager = (text: string) => {
		const input = Number(text)
		const credits_remaining = currentMatch.participants[0].credits_remaining
		const maxCredits = match.starting_credits
		const wager = input <= credits_remaining
			? input <= maxCredits / 2
				? input
				: maxCredits / 2
			: credits_remaining

		dispatch(setWager(wager));
	}

	const selectedPrice: number = selectedLine.first_selection_picked
		? marketLine.first_price
		: marketLine.second_price

	return (
		<View style={[styles.submitWagerContainer, { backgroundColor: color.background_2 }]}>
			<View style={[styles.separatorPadding, { backgroundColor: color.background_2 }]}>
				<View style={styles.separator} />
			</View>
			<View style={[styles.row, { backgroundColor: color.background_2 }]}>
				<Text style={styles.minorText}>wager</Text>
				<TextInput
					style={[styles.wagerInput, { borderColor: color.inactive_text }]}
					keyboardType="numeric"
					placeholder="0"
					value={selectedLine.wager > 0
						? `${selectedLine.wager}`
						: ''
					}
					onChangeText={(text) => handleSetWager(text)}
				/>
				<Text style={styles.minorText}>to win</Text>
				<Text style={[styles.pointsWon, { color: color.won }]}>+{calcualtePointsWon(selectedLine.wager, selectedPrice)}</Text>

			</View>
		</View>

	)
}

const styles = StyleSheet.create({
	submitWagerContainer: {
		flexDirection: 'column',
		borderRadius: 10,
	},
	row: {
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 10,
		borderRadius: 10,
	},
	blankRow: {
		flexDirection: 'row',
		paddingRight: 10,
	},
	separatorPadding: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
	},
	separator: {
		height: 1,
		width: '90%',
	},
	defaultText: {
		fontSize: 24,
	},
	minorText: {
		fontSize: 18,
	},
	wagerInput: {
		borderWidth: 1,
		borderRadius: 10,
		borderStyle: 'dotted',
		padding: 5,
		fontSize: 24,
		color: '#fff',
		width: '20%'
	},
	pointsWon: {
		fontSize: 24,
		width: '25%',
		fontWeight: 700,
	}
})

export default SubmitWager