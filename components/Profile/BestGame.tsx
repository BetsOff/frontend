import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, useColor } from '../Themed';
import { useDispatch } from 'react-redux';
import PlayerScore from '../Scores/PlayerScore';
import { Href, router } from 'expo-router';
import { Stats } from '@/state/profile/SelfSlice';
import { setMatch } from '@/state/MatchSlice';

type BestGameProps = {
  stats: Stats;
}

const BestGame: React.FC<BestGameProps> = ({ stats }) => {
  const color = useColor();
  const dispatch = useDispatch();

  if (!stats) return <></>

  const best_game = stats.best_game;
  const match = best_game.match;

  const handleMatchPressed = () => {
    dispatch(setMatch(match.match_id));
    router.replace('/live-match' as Href);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Game</Text>
      <Text style={styles.match}>{best_game.league} | Season {best_game.season}</Text>
      <Text style={styles.match}>{match.playoff ? 'Playoff' : ''} Match {best_game.match.match_number}</Text>
      <TouchableOpacity onPress={handleMatchPressed}>
        <View style={[styles.matchContainer, { backgroundColor: color.background_2 }]}>
          <PlayerScore
            participant={match.participants[0]}
            winner={match.winner}
            starting_credits={0}
            status={'final'}
          />
          <PlayerScore
            participant={match.participants[1]}
            winner={match.winner}
            starting_credits={0}
            status={'final'}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
  },
  match: {
    fontSize: 20,
    fontWeight: 700,
  },
  matchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 5,
    borderRadius: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 5,
  },
})

export default BestGame
function setSelectedMatch(match: Match): any {
  throw new Error('Function not implemented.');
}

