import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import BetCard from './BetCard';
import BetLeagueName from './BetLeagueName';

type BetListForLeagueProps = {
	bets: LeagueBets;
}

const BetListForLeague: React.FC<BetListForLeagueProps> = ({ bets }) => {
	return (
		<View>
			<BetLeagueName league_name={bets.league_name} />
			{bets.games.map((game, index) => (
				<BetCard league_name={bets.league_name} game={game} key={index} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({

})

export default BetListForLeague