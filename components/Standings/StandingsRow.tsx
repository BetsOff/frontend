import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useColor, View } from '@/components/Themed';

import ClinchTag from './ClinchTag';
import PlayerLogo from '../Logo/PlayerLogo';
import { storageGetItem } from '@/util/Storage';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setUserId } from '@/state/profile/ProfileSlice';

type StandingsRowProps = {
  standing: Standing;
  row: number;
}

const StandingsRow: React.FC<StandingsRowProps> = ({ standing, row }) => {
  const color = useColor();
  const router = useRouter();
  const dispatch = useDispatch();

  const background_color = row % 2 == 0
    ? color.background_2
    : color.background_1

  const userStyle = standing.user.length <= 10
    ? [styles.cellTextMajor]
    : [styles.longCellTextMajor]

  // standing.user == storageGetItem('user')

  const handleProfilePressed = () => {
    router.push('/other_profile');
    dispatch(setUserId(standing.user_id));
  }

  return (
    <TouchableOpacity onPress={handleProfilePressed}>
      <View style={[styles.tableRow, { backgroundColor: background_color }]} key={row} >
        {/* Seed */}
        <View style={[styles.seedCell, { backgroundColor: background_color }]}>
          <Text style={styles.cellTextMinor}>{row + 1}</Text>
        </View>
        {/* Player Logo */}
        <View style={[styles.logoCell, { backgroundColor: background_color }]}>
          <PlayerLogo logo={standing.logo} diameter={24} />
        </View>
        {/* Player */}
        <View style={[styles.playerCell, { backgroundColor: background_color }]}>
          <Text style={userStyle}>{standing.user}</Text>
          {standing.user == storageGetItem('user') &&(
            <MaterialCommunityIcons name="account" size={20} color={color.inactive_text} />
          )}
        </View>
        {/* Clinch Tag */}
        <View style={[styles.clinchCell, { backgroundColor: background_color }]}>
          <ClinchTag clinch={standing.clinch} row_background={background_color} />
        </View>
        {/* Record */}
        <View style={[styles.recordCell, { backgroundColor: background_color }]}>
          <Text style={styles.cellTextMinor}>
            {standing.win}-{standing.loss}-{standing.draw}
          </Text>
        </View>
        {/* Points For */}
        <View style={[styles.diffCell, { backgroundColor: background_color }]}>
          <Text style={styles.cellTextMinor}>{standing.pf}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const baseStyles = StyleSheet.create({
  cell: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    width: '100%',
  },
  seedCell: {
    ...baseStyles.cell,
    width: '10%',
  },
  logoCell: {
    ...baseStyles.cell,
    width: '8%'
  },
  playerCell: {
    ...baseStyles.cell,
    width: '32%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  clinchCell: {
    ...baseStyles.cell,
    padding: 0,
    width: '10%',
  },
  recordCell: {
    ...baseStyles.cell,
    width: '20%',
  },
  diffCell: {
    ...baseStyles.cell,
    width: '20%',
  },
  cellTextMajor: {
    fontWeight: 500,
    fontSize: 20,
    paddingRight: 5,
  },
  longCellTextMajor: {
    fontWeight: 500,
    fontSize: 16,
    padding: 3,
  },
  cellTextMinor: {
    fontSize: 16
  }
});

export default StandingsRow;