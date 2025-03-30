import { Text, useColor, View } from '@/components/Themed';
import calcualtePointsWon from '@/util/calculatePointsWon';
import { StyleSheet } from 'react-native';

type WagerProps = {
	league_name: string;
	status: string;
	wager: Wager;
}

const Wager: React.FC<WagerProps> = ({ league_name, status, wager }) => {
	const color = useColor();

	const calculatePoints = calcualtePointsWon(wager.wager, wager.first_selection_picked ? wager.first_price : wager.second_price);

	const roundScores = (league_name == 'NBA' && wager.market == 'totals') || calculatePoints >= 100

	let market_title = wager.market == 'totals'
		? league_name == 'MLB'
			? 'Total Runs'
			: 'Total Points'
		: 'Moneyline'

	const bgColor = status == "Final"
		? wager.points_earned > 0
			? color.won
			: color.loss
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


	return (
		<View style={[styles.container, { backgroundColor: color.background_2 }]}>
			<View style={[styles.separatorPadding, { backgroundColor: color.background_2 }]}>
				<View style={[styles.separator, { backgroundColor: color.inactive_text }]} />
			</View>
			<View style={[styles.wagerContainer, { backgroundColor: bgColor }]}>
				{/* Wager Header */}
				<View style={[styles.flexRow, { backgroundColor: bgColor }]}>
					<View style={[styles.wagerHeader, { backgroundColor: bgColor }]}>
						<Text style={textStyles.header}>{market_title}</Text>
						<Text style={textStyles.header}>{wager.wager}</Text>
					</View>
				</View>
				{/* Selections and Score */}
				<View style={[styles.flexRow, { backgroundColor: bgColor }]}>
					<View style={[styles.selectionsAndScoreContainer, { backgroundColor: bgColor }]}>
						{/* Selections */}
						<View style={[styles.selectionsContainer, { backgroundColor: bgColor }]}>
							<Text style={styles.defaultText}>{selectionPrice} {selectionPicked} {wager.point}</Text>
						</View>
						{/* Score */}
						{status == "Final" ? (
							<Text style={[textStyles.pointsEarned]}>
								{roundScores
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
			</View>
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