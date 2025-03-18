import { StyleSheet } from 'react-native';
import { Text, useColor, View } from '@/components/Themed';

import ClinchTag from './ClinchTag';
import PlayerLogo from '../PlayerLogo';
import { storageGetItem } from '@/util/Storage';

type StandingsRowProps = {
  standing: Standing;
  row: number;
}

const StandingsRow: React.FC<StandingsRowProps> = ({ standing, row }) => {
  const color = useColor();
  const background_color = row % 2 == 0
    ? color.background_2
    : color.background_1

  const userStyle = standing.user.length <= 11
    ? [styles.cellTextMajor]
    : [styles.longCellTextMajor]

  const rowBackgroundColor = standing.user == storageGetItem('user')
    ? color.background_3
    : background_color

  return (
    <View style={[styles.tableRow, { backgroundColor: rowBackgroundColor }]} key={row} >
      {/* Seed */}
      <View style={[styles.seedCell, { backgroundColor: rowBackgroundColor }]}>
        <Text style={styles.cellTextMinor}>{row + 1}</Text>
      </View>

      {/* Player Logo */}
      <View style={[styles.logoCell, { backgroundColor: rowBackgroundColor }]}>
        <PlayerLogo color={standing.color} diameter={24} />
      </View>

      {/* Player */}
      <View style={[styles.playerCell, { backgroundColor: rowBackgroundColor }]}>
        <Text style={userStyle}>{standing.user}</Text>
      </View>

      {/* Clinch Tag */}
      <View style={[styles.clinchCell, { backgroundColor: rowBackgroundColor }]}>
        <ClinchTag clinch={standing.clinch} row_background={rowBackgroundColor} />
      </View>

      {/* Record */}
      <View style={[styles.recordCell, { backgroundColor: rowBackgroundColor }]}>
        <Text style={styles.cellTextMinor}>
          {standing.win}-{standing.loss}-{standing.draw}
        </Text>
      </View>

      {/* Points For */}
      <View style={[styles.diffCell, { backgroundColor: rowBackgroundColor }]}>
        <Text style={styles.cellTextMinor}>{standing.pf}</Text>
      </View>
    </View>
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
    alignItems: 'flex-start',
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
    fontSize: 20
  },
  longCellTextMajor: {
    fontWeight: 500,
    fontSize: 16,
  },
  cellTextMinor: {
    fontSize: 16
  }
});

export default StandingsRow;