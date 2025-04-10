import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useColor, View } from '@/components/Themed';

import formatDateWithYear from '@/util/date/formatDateWithYear';
import CreateButton from './CreateButton';

import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { useSelectedLeague } from '@/api/leagueQueries';
import { useSeasons, useSelectedSeason } from '@/api/seasonQueries';
import HeaderLoading from './HeaderLoading';

type SeasonProps = {
  name: string;
  start_date: string;
  end_date: string;
}

const SeasonHeader: React.FC<SeasonProps> = ({ 
  name,
  start_date, 
  end_date, 
}) => {
  const color = useColor();
  const { data: league, isLoading: leagueLoading, error: leagueError } = useSelectedLeague();
  const { data: seasons, isLoading: seasonLoading, error: seasonError } = useSeasons();
  const { data: currentSeason } = useSelectedSeason();

  if (leagueLoading || seasonLoading) return (<HeaderLoading />);
  if (!league || !seasons) return (<></>);

  const today = new Date();
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  endDate.setDate(endDate.getDate() - 1);

  const mostRecentSeason = seasons[0] === currentSeason;
  const currentSeasonSelected = String(currentSeason?.season_number) === name[name.length - 1]
  const noCurrentSeason = (endDate.getTime() < today.getTime() || start_date == undefined)

  const showCreateSeason =  noCurrentSeason && mostRecentSeason && currentSeasonSelected && league!.commissioner

  return (
    <View style={styles.container}>
      <View style={styles.seasonContainer}>
        <Text style={styles.seasonText}>{name}</Text>
        {start_date != undefined
          ? <Text style={[styles.datesText, { color: color.inactive_text }]}>{formatDateWithYear(startDate)} - {formatDateWithYear(endDate)}</Text>
          : <></>
        }
      </View>
      {showCreateSeason && (
        <CreateButton object='Season' link='/create_season' />
      )}
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