import { StyleSheet } from 'react-native';
import { View, Text, useColor } from '../Themed';
import getIcon from '@/util/Icons';
import { Stats } from '@/state/profile/SelfSlice';

type BetAccuracyProps = {
  stats: Stats
}

const BetAccuracy: React.FC<BetAccuracyProps> = ({ stats }) => {
  const color = useColor();

  if (!stats) return <></>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bet Accuracy</Text>
      <Text style={styles.accuracyText}>{Math.round(stats.bet_accuracy.total * 100)} %</Text>
      <View style={styles.leaguesRow}>
      {stats.bet_accuracy.byLeague.map((league, index) => (
        <View style={styles.leagueAccuracyContainer} key={index}>
          <View style={styles.leaguesRow}>
            {getIcon(league.league, color.inactive_text, 20)}
            <Text style={[styles.leagueAccuracyText, { color: color.inactive_text }]}>{league.league}</Text>
          </View>
          <Text style={styles.accuracyText}>{Math.round(league.accuracy * 100)} %</Text>
        </View>
      ))}
      </View>
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
  accuracyText: {
    fontSize: 20,
    fontWeight: 600,
  },
  leagueAccuracyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 20,
  },
  leaguesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leagueAccuracyText: {
    paddingHorizontal: 5,
    fontSize: 20,
  },
})

export default BetAccuracy
