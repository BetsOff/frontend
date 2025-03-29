import { Text, View } from '@/components/Themed';

import LineCard from './LineCard'
import { StyleSheet, ScrollView } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { LineState } from '@/state/LineSlice';

const leagueMapping: Record<'MLB' | 'NFL' | 'NBA' | 'NHL', keyof LineState> = {
  MLB: "mlbLines",
  NFL: "nflLines",
  NBA: "nbaLines",
  NHL: "nhlLines",
};

type LinesListProps = {

}

const LinesList: React.FC<LinesListProps> = ({ }) => {
	const lineState = useSelector((state: RootState) => state.line);
	const selectedLeague = lineState.selectedLeague;
	const lines = selectedLeague === 'MLB'
		? lineState.mlbLines
		: selectedLeague === 'NFL'
			? lineState.nflLines
			: selectedLeague === 'NBA'
				? lineState.nbaLines
				: selectedLeague === 'NHL'
					? lineState.nhlLines
					: [];
	
	useSelector((state: RootState) => 
		state.line[leagueMapping[selectedLeague as keyof typeof leagueMapping]] as Line[]
	);

	if (!lines) return (<></>);

	if (lines.length == 0) {
		return (
			<View style={styles.noGameContainer}>
				<Text style={styles.noGamesText}>No games left today</Text>
			</View>
		);
	}

	return (
		<View style={styles.lineListContainer}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 350 }}>
				{lines!.map((line, index) => (
					<LineCard line={line} key={index} />
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	lineListContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		marginVertical: 0,
		width: '90%',
		height: '100%',
	},
	noGameContainer: {
		paddingVertical: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noGamesText: {
		fontSize: 32,
		fontWeight: 600,
	}
})

export default LinesList