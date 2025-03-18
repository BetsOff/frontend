import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useColor, View } from '@/components/Themed';

import formatDateWithYear from '@/util/date/formatDateWithYear';
import CreateButton from './CreateButton';
import { useLeagueContext } from '@/context/useLeagueContext';

type SeasonProps = {
  name: string;
  start_date: string;
  end_date: string;
}

const SeasonHeader: React.FC<SeasonProps> = ({ name, start_date, end_date }) => {
  const color = useColor();
  const { league } = useLeagueContext();

  const today = new Date();
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)
  endDate.setDate(endDate.getDate() - 1);

  return (
    <View style={styles.container}>
      <View style={styles.seasonContainer}>
        <Text style={styles.seasonText}>{name}</Text>
        {start_date != undefined
          ? <Text style={[styles.datesText, { color: color.inactive_text }]}>{formatDateWithYear(startDate)} - {formatDateWithYear(endDate)}</Text>
          : <></>
        }
      </View>
      {(endDate.getTime() < today.getTime() || start_date == undefined) && league.commissioner
        ? <CreateButton object='Season' link='/create_season' />
        : <></>
      }
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
  },
  seasonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 15,
  },
  seasonText: {
    fontSize: 30,
  },
  datesText: {
    fontSize: 18,
    fontWeight: 200,
  }
})

export default SeasonHeader