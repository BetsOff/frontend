import { Text, View } from '@/components/Themed';

import LineCard from './LineCard'
import { StyleSheet, ScrollView } from 'react-native';
import { useSelectedLeagueContext } from '../../context/useSelectedLeagueContext';
import { useEffect, useState } from 'react';

import getToday from '@/util/date/getToday';
import axios from 'axios';
import { storageGetItem } from '@/util/Storage';
import apiRoutes from '@/routes/apiRoutes';

type LinesListProps = {

}

const LinesList: React.FC<LinesListProps> = ({ }) => {
	const [loading, setLoading] = useState(true);
	const { selectedLeague } = useSelectedLeagueContext();
	const [lines, setLines] = useState<Line[]>([]);

	const fetchData = async () => {
		try {
			const response = await axios.get(apiRoutes.line.get + `?league=${selectedLeague}&date=${getToday()}`, {
				headers: {
					'Content-Type': 'application/json',
					'X-Authorization': `Token ${storageGetItem('token')}`
				}
			})
			setLines(response.data)
		} catch (error) {
			console.error('Error fetching lines:', error)
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, [selectedLeague])

	if (loading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	};

	if (lines!.length == 0) {
		return (
			<View style={styles.noGameContainer}>
				<Text style={styles.noGamesText}>No games left today</Text>
			</View>
		)
	}

	return (
		<View style={styles.lineListContainer}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 350 }}>
				{lines!.map((line, index) => (
					<LineCard line={line} key={index} />
				))}
			</ScrollView>
		</View>
	)
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