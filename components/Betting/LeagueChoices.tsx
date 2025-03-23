import { Text, useColor, View } from '@/components/Themed';
import { setSelectedLeague } from '@/state/LineSlice';
import { RootState } from '@/state/store';
import getIcon from '@/util/Icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type LeagueChoicesProps = {

}

const LeagueChoices: React.FC<LeagueChoicesProps> = ({ }) => {
  const color = useColor();
  const dispatch = useDispatch();
  const { selectedLeague, leagueChoices }= useSelector((state: RootState) => state.line);

  return (
    <View style={styles.container}>
      {leagueChoices.map((league, index) => (
        <TouchableOpacity style={styles.leagueCell} key={index} onPress={() => dispatch(setSelectedLeague(league))}>
          <View>
            <View style={styles.row}>
              {getIcon(league, league == selectedLeague ? color.active_text : color.inactive_text, 20)}
              <Text style={[styles.text, { color: league == selectedLeague ? color.active_text : color.inactive_text }]}>{league}</Text>
            </View>
            {league == selectedLeague
              ? <View style={[styles.selectionStatus, { backgroundColor: color.won }]} />
              : <View style={[styles.selectionStatus]} />
            }
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leagueCell: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%'
  },
  text: {
    paddingHorizontal: 5,
    fontSize: 20,
  },
  selectionStatus: {
    marginTop: 5,
    height: 2,
  },
})

export default LeagueChoices