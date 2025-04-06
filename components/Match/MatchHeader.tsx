import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useColor, View } from '@/components/Themed';

import formatDateWithDay from '@/util/date/formatDateWithDay';
import { useSelectedMatch } from '@/api/matchQueries';

type MatchHeaderProps = {

}

const MatchHeader: React.FC<MatchHeaderProps> = ({ }) => {
  const color = useColor();
  const { data: matchInfo } = useSelectedMatch();

  if (!matchInfo) return (<></>);

  let startDate = new Date(matchInfo.start_date);
  let endDate = new Date(matchInfo.end_date);
  endDate.setDate(endDate.getDate() - 1);

  const oneDayMatch = startDate.getDate() == endDate.getDate();

  const date = oneDayMatch
    ? `${formatDateWithDay(startDate)}`
    : `${formatDateWithDay(startDate)} - ${formatDateWithDay(endDate)}`

  const title = matchInfo.playoff
    ? matchInfo.round_name
    : `Match ${matchInfo.match_number}`

  const textStyle = matchInfo.playoff
    ? matchInfo.round_name == 'Final'
      ? styles.final
      : styles.playoff
    : styles.matchText

  return (
    <View style={styles.matchContainer}>
      <Text style={textStyle}>{title}</Text>
      <Text style={[styles.datesText, { color: color.inactive_text }]}>{date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  matchContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 15,
    width: '100%',
  },
  matchText: {
    fontSize: 30,
  },
  playoff: {
    fontSize: 30,
    fontWeight: 500,
  },
  final: {
    fontSize: 30,
    fontWeight: 700,
  },
  datesText: {
    fontSize: 18,
    fontWeight: 200,
  }
})

export default MatchHeader