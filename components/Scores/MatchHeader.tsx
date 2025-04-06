import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useColor, View } from '@/components/Themed';

import formatDateWithDay from '@/util/date/formatDateWithDay';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { useMatches } from '@/api/matchQueries';

type MatchHeaderProps = {
  isLoading: boolean
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ 
  isLoading = false,
}) => {
  const color = useColor();
	const { data: matches } = useMatches();
  
  if (isLoading) return (
    <View style={styles.matchContainer}>
      <View style={{
        backgroundColor: color.background_3,
        borderRadius: 5,
        paddingHorizontal: 5,
        width: '20%',
        marginTop: -2,
        marginBottom: 2,
      }}>
        <Text style={styles.matchText}> </Text>
      </View>
      <View style={{
        backgroundColor: color.background_2,
        borderRadius: 5,
        paddingHorizontal: 5,
        width: '30%',
        marginTop: 2,
        marginBottom: -2,
      }}>
        <Text style={[styles.datesText, { color: color.inactive_text }]}>{" "}</Text>
      </View>
    </View>
  );

  if (!matches) return (<></>);

  let startDate = new Date(matches.start_date);
  let endDate = new Date(matches.end_date);
  endDate.setDate(endDate.getDate() - 1);

  const oneDayMatch = startDate.getDate() == endDate.getDate();

  const date = oneDayMatch
    ? `${formatDateWithDay(startDate)}`
    : `${formatDateWithDay(startDate)} - ${formatDateWithDay(endDate)}`

  const title = matches.playoff
    ? matches.round_name
    : `Match ${matches.match_number}`

  const textStyle = matches.playoff
    ? matches.round_name == 'Final'
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
