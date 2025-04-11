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

  const pf = standing.pf >= 1000
    ? Math.round(standing.pf)
    : standing.pf >= 100
      ? Math.round(standing.pf * 10) / 10
      : standing.pf

  const parsed_odds = standing.playoff_odds === 100
    ? '>99'
    : standing.playoff_odds === 0
      ? '<1'
      : standing.playoff_odds

  const handleProfilePressed = () => {
    dispatch(setUserId(standing.user_id));
    if (String(standing.user_id) == storageGetItem('user_id')) {
      router.replace('/(tabs)/profile');
    } else {
      router.push('/other_profile');
    }
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
        {standing.clinch && (
          <View style={[styles.clinchCell, { backgroundColor: background_color }]}>
            <ClinchTag clinch={standing.clinch} row_background={background_color} />
          </View>
        )}
        {!standing.clinch && (
          <View style={[styles.clinchCell, { backgroundColor: background_color }]}>
            <Text style={{ 
              fontSize: 14,
              fontWeight: 700,
              fontStyle: 'italic',
              color: color.inactive_text,
            }}>
              {parsed_odds}%
            </Text>
          </View>
        )}
        {/* Record */}
        <View style={[styles.recordCell, { backgroundColor: background_color }]}>
          <Text style={styles.cellTextMinor}>
            {standing.win}-{standing.loss}-{standing.draw}
          </Text>
        </View>
        {/* Points For */}
        <View style={[styles.diffCell, { backgroundColor: background_color }]}>
          <Text style={styles.cellTextMinor}>{pf}</Text>
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
    width: '15%',
  },
  recordCell: {
    ...baseStyles.cell,
    width: '20%',
  },
  diffCell: {
    ...baseStyles.cell,
    width: '15%',
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