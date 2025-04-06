import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import LeagueHeader from '@/components/LeagueHeader';
import MatchHeader from '@/components/Scores/MatchHeader';
import MatchList from '@/components/Scores/MatchList';

import SteppingBar from '@/components/SteppingBar';
import NoDataScreen from '../no_data';
import CreateButton from '@/components/CreateButton';
import { useDispatch, useSelector } from 'react-redux';
import { useSelectedLeague } from '@/api/leagueQueries';
import { useSelectedSeason } from '@/api/seasonQueries';
import { useMatches } from '@/api/matchQueries';
import { RootState } from '@/state/store';
import { back, forward, setMatchDate } from '@/state/MatchSlice';
import getToday from '@/util/date/getToday';

export default function ScoresScreen() {
  const dispatch = useDispatch();
  const date = useSelector((state: RootState) => state.match.matchDate)

  const { 
    data: league, 
    isLoading: leagueIsLoading,
    error: leagueError,
  } = useSelectedLeague();

  const {
    data: season,
    isLoading: seasonIsLoading,
    error: seasonError,
  } = useSelectedSeason();

  const {
    data: matches,
    isLoading: matchIsLoading,
    error: matchError,
    refetch: refetchMatches,
  } = useMatches();

  const backMatch = () => {
    var next_match = 1;
    var playoff = false;
    if (matches.playoff == true) {
      // Playoff
      if (matches.match_number == 1) {
        next_match = matches.num_regular_season_matches;
      } else {
        next_match = matches.match_number - 1;
        playoff = true;
      }
    } else {
      // Regular Season
      if (matches.match_number > 1) {
        next_match = matches.match_number - 1;
      }
    }
    dispatch(back([date || getToday(), season?.matchup_length || 0]));
  }

  const forwardMatch = () => {
    var next_match = 1;
    var playoff = false;
    if (matches.playoff == true) {
      // Playoff
      playoff = true;
      if (matches.match_number < matches.num_playoff_matches) {
        next_match = matches.match_number + 1;
      } else {
        next_match = matches.num_playoff_matches;
      }
    } else {
      // Regular Season
      if (matches.match_number == matches.num_regular_season_matches && matches.num_playoff_matches > 0) {
        next_match = 1
        playoff = true
      } else {
        next_match = matches.match_number + 1;
      }
    }
    dispatch(forward([date || getToday(), season?.matchup_length || 0]));
  }

  const firstMatch = matches
    ? !matches.playoff && matches.match_number == 1
    : false
  const lastMatch = matches
    ? matches.playoff && matches.match_number == matches.num_playoff_matches
    : false
  const backDisabled = firstMatch || !matches;
  const forwardDisabled = lastMatch || !matches;

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
    }}>
      {(leagueError || (!league && !leagueIsLoading)) && (
        <>
          <NoDataScreen data='league' />
        </>
      )}
      <LeagueHeader 
        leagueName={league?.name || ''}
        isLoading={leagueIsLoading}
      />
      {(seasonError || (!season && !seasonIsLoading)) && (
        <>
          {league!.commissioner
            ? (
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
                <CreateButton object='Season' link='/create_season' />
              </View>
            ) : (
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
                <Text>
                  Ask commissioner to start a season
                </Text>
              </View>
          )}
        </>
      )}
      {!matchError && season && (
        <>
          <MatchHeader isLoading={matchIsLoading} />
          <SteppingBar 
            onGoForward={forwardMatch} 
            onGoBack={backMatch} 
            forwardDisabled={forwardDisabled}
            backDisabled={backDisabled}
          />
          <MatchList isLoading={matchIsLoading} />
        </>
      )}
    </View>
  );
}
