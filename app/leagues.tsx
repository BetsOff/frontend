import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CreateButton from '@/components/CreateButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setCurrentLeague } from '@/state/league/LeagueSlice';

export default function LeaguesScreen() {
  const color = useColor();
  const router = useRouter();
  const dispatch = useDispatch();
  const { leagues, currentLeague } = useSelector((state: RootState) => state.league);

  const handleLeaguePressed = (league: League) => {
    dispatch(setCurrentLeague(league));
    router.push('/league')
  }

  return (
    <View style={styles.container}>
      {leagues.map((league, index) => (
        <TouchableOpacity key={index} onPress={() => handleLeaguePressed(league)}>
          <View style={[styles.row, { backgroundColor: index % 2 == 0 ? color.background_2 : color.background_1 }]}>
            <Text style={styles.leagueText}>{league.name}</Text>
            <AntDesign name="right" size={24} color={color.active_text} />
          </View>
        </TouchableOpacity>
      ))}
      <View style={styles.buttonContainer}>
        <CreateButton object='League' link='create_league' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leagueText: {
    fontSize: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
})