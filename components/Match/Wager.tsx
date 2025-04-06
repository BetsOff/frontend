import { Text, useColor, View } from '@/components/Themed';
import { addPlayerScore, removePlayerScore } from '@/state/MatchSlice';
import { RootState } from '@/state/store';
import calcualtePointsWon from '@/util/calculatePointsWon';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type WagerProps = {
	league_name: string;
	status: string;
	wager: Wager;
	participant_index: 0 | 1;
}

const Wager: React.FC<WagerProps> = ({ league_name, status, wager, participant_index }) => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const [scenario, setScenario] = useState<'won' | 'lost' | null>(null);
	const color = useColor();
	const resetKey = useSelector((state: RootState) => state.match.resetKey);
	const dispatch = useDispatch();
	const calculatePoints = calcualtePointsWon(wager.wager, wager.first_selection_picked ? wager.first_price : wager.second_price);
	const roundScores = (league_name == 'NBA' && wager.market == 'totals') || calculatePoints >= 100;
	const wagerLost = status === "Final" && wager.points_earned === 0;

	const handleWagerPressed = () => {
		setExpanded(!expanded);
	}

	const handleScenarioWon = () => {
		setScenario('won');
		dispatch(addPlayerScore({ playerIndex: participant_index, betId: wager.id, value: calculatePoints }));
		setExpanded(!expanded);
	}

	const handleScenarioLost = () => {
		setScenario('lost');
		dispatch(addPlayerScore({ playerIndex: participant_index, betId: wager.id, value: -1 * calculatePoints }));
		setExpanded(!expanded);
	}

	const handleScenarioReset = () => {
		setScenario(null);
		dispatch(removePlayerScore({ playerIndex: participant_index, betId: wager.id, value: calculatePoints }))
		setExpanded(!expanded);
	}

	const market_title = wager.market == 'totals'
		? league_name == 'MLB'
			? 'Total Runs'
			: 'Total Points'
		: 'Moneyline'

	const bgColor = status == "Final"
		? wager.points_earned > 0
			? color.won
			: color.loss
		: scenario == 'won'
			? color.scenarioWon
			: scenario == 'lost'
				? color.scenarioLoss
				: color.background_2

	let selectionPicked = wager.first_selection_picked
		? wager.first_selection
		: wager.second_selection
	let selectionPriceNumber = wager.first_selection_picked
		? wager.first_price
		: wager.second_price

	if (selectionPicked == 'over') {
		selectionPicked = roundScores
			? 'O'
			: 'OVR'
	} else if (selectionPicked == 'under') {
		selectionPicked = roundScores
			? 'U'
			: 'UND'
	}

	const selectionPrice: string = selectionPriceNumber > 0
		? `+${selectionPriceNumber}`
		: `${selectionPriceNumber}`

	const potentialPoints = roundScores
		? calculatePoints.toFixed(1)
		: calculatePoints

	
	useEffect(() => {
		setScenario(null);
	}, [resetKey]);

	return (
			<View style={[styles.container, { backgroundColor: color.background_2 }]}>
				<View style={[styles.separatorPadding, { backgroundColor: color.background_2 }]}>
					<View style={[styles.separator, { backgroundColor: color.inactive_text }]} />
				</View>
				<TouchableOpacity onPress={handleWagerPressed} style={[styles.wagerContainer, { backgroundColor: bgColor }]}>
					{/* Wager Header */}
					<View style={[styles.flexRow, { backgroundColor: color.transparent }]}>
						<View style={[styles.wagerHeader, { backgroundColor: color.transparent }]}>
							<Text style={textStyles.header}>{market_title}</Text>
							<Text style={textStyles.header}>{wager.wager}</Text>
						</View>
					</View>
					{/* Selections and Score */}
					<View style={[styles.flexRow, { backgroundColor: color.transparent }]}>
						<View style={[styles.selectionsAndScoreContainer, { backgroundColor: color.transparent }]}>
							{/* Selections */}
							<View style={[styles.selectionsContainer, { backgroundColor: color.transparent }]}>
								<Text style={styles.defaultText}>{selectionPrice} {selectionPicked} {wager.point}</Text>
							</View>
							{/* Score */}
							{status == "Final" ? (
								<Text style={[textStyles.pointsEarned]}>
									{roundScores && !wagerLost
										? wager.points_earned.toFixed(1)
										: wager.points_earned
									}
								</Text>
							) : (
								<Text style={[textStyles.potentialPointsEarned, { color: color.inactive_text }]}>
									{potentialPoints}
								</Text>
							)}
						</View>
					</View>
				</TouchableOpacity>
				{expanded && status !== "Final" && (
					<View style={[styles.flexRow, { backgroundColor: color.transparent, marginTop: 5 }]}>
						<TouchableOpacity onPress={handleScenarioWon} style={[styles.scenarioButton, { backgroundColor: color.scenarioWon }]}>
							<Text>Won</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleScenarioReset} style={[styles.scenarioButton, { backgroundColor: color.background_3 }]}>
							<Text>Reset</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleScenarioLost} style={[styles.scenarioButton, { backgroundColor: color.scenarioLoss }]}>
							<Text>Lost</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
	},
	wagerContainer: {
		width: '100%',
		borderRadius: 10,
		padding: 3,
	},
	wagerHeader: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-between',
		marginHorizontal: 5,
		marginBottom: 5,
	},
	selectionsAndScoreContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		marginHorizontal: 5,
		justifyContent: 'space-between',
	},
	selectionsContainer: {
		flexDirection: 'row',
	},
	flexRow: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
	},
	separatorPadding: {
		justifyContent: 'center',
		padding: 5,
	},
	separator: {
		height: 1,
		width: '100%',
	},
	defaultText: {
		fontSize: 18,
	},
	scenarioButton: {
		width: '30%',
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginHorizontal: 5,
		marginVertical: 2,
	}
})

const textStyles = StyleSheet.create({
	header: {
		fontSize: 14,
	},
	pointsEarned: {
		fontWeight: 600,
		fontSize: 24,
	},
	potentialPointsEarned: {
		fontWeight: 300,
		fontSize: 20,
		fontStyle: "italic",
	},
	selectionNotPicked: {
		...styles.defaultText,
	},
	selectionLive: {
		...styles.defaultText,
	},
	selectionWon: {
		...styles.defaultText,
	},
	selectionLost: {
		...styles.defaultText,
	}
})

export default Wager