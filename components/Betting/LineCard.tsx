import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';

import MarketLine from './MarketLine';
import SubmitWager from './SubmitWager';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { storageGetItem } from '@/util/Storage';
import { formatDateWithTime } from '@/util/date/formatDateWithDayTime';
import apiRoutes from '@/routes/apiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { resetSelectedLine } from '@/state/LineSlice';
import { setPlayerOneBets } from '@/state/BetSlice';
import { useCredits } from '@/state/MatchSlice';

type LineProps = {
	line: Line;
}

const LineCard: React.FC<LineProps> = ({ line }) => {
	const color = useColor();
	const router = useRouter();
	const dispatch = useDispatch();
	const selectedLine = useSelector((state: RootState) => state.line.selectedLine);
	const currentMatch =  useSelector((state: RootState) => state.match.currentMatch);

	if (!currentMatch) return (<></>)

	const startTime: Date = new Date(line.start_time);

	let containsSelectedLine: boolean = false
	for (let i = 0; i < line.lines.length; i++) {
		if (selectedLine && line.lines[i].id == selectedLine.id) {
			containsSelectedLine = true
		}
	}

	const handleBetSubmit = async () => {
		if (!selectedLine) return (<></>);
		const userId = storageGetItem('user_id');
		const token = storageGetItem('token');

		axios.post(apiRoutes.bet.create, {
			user_id: userId,
			match_id: currentMatch.match_id,
			line_id: selectedLine.id,
			first_selection_picked: selectedLine.first_selection_picked,
			wager: selectedLine.wager,
		}, {
			headers: {
				'X-Authorization': `Token ${token}`
			}
		})
			.then(response => {
				dispatch(setPlayerOneBets(response.data));
			})
			.catch(error => {
				console.error('Error creating bet', error);
			})
			.finally(() => {
				dispatch(resetSelectedLine());
				dispatch(useCredits(selectedLine.wager))
				router.back();
			});

	}

	const buttonColor = selectedLine && selectedLine.wager > 0
	? color.brand
	: color.background_3

	return (
		<View>
			<View style={styles.gameHeader}>
				<Text style={styles.gameHeaderText}>{line.away_tag} @ {line.home_tag} | {formatDateWithTime(startTime)} </Text>
			</View>
			<View style={[styles.lineCardContainer, { backgroundColor: color.background_2 }]}>
				{line.lines.map((marketLine, index) => (
					<View style={[{ backgroundColor: color.background_2, borderRadius: 10, }]}>
						<MarketLine
							line={line}
							marketLine={marketLine}
							key={index}
						/>

						{index !== line.lines.length - 1 && (
							<View style={[styles.separatorPadding, { backgroundColor: color.background_2 }]}>
								<View style={styles.separator} />
							</View>
						)}

					</View>
				))}

				{line.lines.map((marketLine, index) => (
					marketLine.id == (selectedLine && selectedLine.id) && (
						<SubmitWager marketLine={line.lines[index]} />
					)))}
			</View>

			{line.lines.map((marketLine) => (
				marketLine.id == (selectedLine && selectedLine.id) && (
					<TouchableOpacity onPress={handleBetSubmit}>
						<View style={[styles.button, { backgroundColor: buttonColor }]}>
							<Text style={styles.submit}>Submit</Text>
						</View>
					</TouchableOpacity>
				)))}
		</View>
	)
}

const styles = StyleSheet.create({
	gameHeader: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginLeft: 15,
		marginTop: 10,
	},
	gameHeaderText: {
		fontSize: 20,
		letterSpacing: 1,
		fontWeight: 700,
	},
	lineCardContainer: {
		justifyContent: 'center',
		flexDirection: 'column',
		margin: 10,
		marginTop: 5,
		borderRadius: 10,
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
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		padding: 5,
		paddingVertical: 10,
		borderRadius: 10,
	},
	submit: {
		fontSize: 24,
		fontWeight: 500,
	}
})

export default LineCard