import { Text, useColor, View } from '@/components/Themed';
import getIcon from '@/util/Icons';
import { StyleSheet } from 'react-native';

type BetLeagueNameProps = {
	league_name: string;
}

const BetLeagueName: React.FC<BetLeagueNameProps> = ({ league_name }) => {
	const color = useColor();
	return (
		<View style={styles.container}>
			{getIcon(league_name, color.active_text, 20)}
			<Text style={styles.text}>{league_name}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	text: {
		fontSize: 16,
		fontWeight: 700,
		paddingLeft: 10
	}
})

export default BetLeagueName