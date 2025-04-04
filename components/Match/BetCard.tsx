import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import Wager from './Wager'
import { formatDateWithTime } from '@/util/date/formatDateWithDayTime';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useEffect } from 'react';

type BetCardProps = {
	league_name: string;
	game: Game;
	participant_index: 0 | 1;
}

const BetCard: React.FC<BetCardProps> = ({ participant_index, league_name, game }) => {
	const color = useColor();
	const startTime: Date = new Date(game.start_time);
	const statusStyle = game.status == 'Upcoming'
		? textStyles.statusUpcoming
		: game.status == 'Final'
			? textStyles.statusFinal
			: textStyles.statusLive

	const status = game.status == 'Upcoming'
		? `Today, ${formatDateWithTime(startTime)}`
		: game.status


	return (
		<View style={styles.container}>
			<View style={[styles.betCardContainer, { backgroundColor: color.background_2 }]}>
				<View style={[styles.gameInfoContainer, { backgroundColor: color.background_2 }]}>
					<View style={[styles.scoreContainer, { backgroundColor: color.background_2 }]}>
						<Text style={textStyles.defaultText}>{game.home_tag}</Text>
						<Text style={textStyles.defaultText}>{game.home_score}</Text>
						<Text style={textStyles.defaultText}>-</Text>
						<Text style={textStyles.defaultText}>{game.away_score}</Text>
						<Text style={textStyles.defaultText}>{game.away_tag}</Text>
					</View>
				</View>
				<Text style={statusStyle}>{status}</Text>
				{game.wagers.map((wager, index) => (
					<Wager participant_index={participant_index} league_name={league_name} wager={wager} status={game.status} key={index} />
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 10,
	},
	gameHeaderText: {
		fontSize: 10,
	},
	betCardContainer: {
		justifyContent: 'space-evenly',
		alignItems: 'center',
		padding: 5,
		width: '150%',
		borderRadius: 10,
		// Shadow for iOS
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		// Shadow for Android
		elevation: 5,
	},
	gameInfoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	scoreContainer: {
		flex: 1,
		padding: 5,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	}
})

const textStyles = StyleSheet.create({
	defaultText: {
		fontSize: 20,
	},
	statusFinal: {
		fontSize: 20,
		fontWeight: 600,
	},
	statusUpcoming: {
		fontSize: 20,
		fontStyle: 'italic',
		fontWeight: 200,
	},
	statusLive: {
		fontSize: 20,
		color: '#7b83ed',
	}
})

export default BetCard