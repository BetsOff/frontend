import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { View } from '@/components/Themed';
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
import { setMatchSet } from '@/state/MatchSlice';

export default function ScoresScreen() {
  const dispatch = useDispatch();
  const [matchNumber, setMatchNumber] = useState<number | undefined>();
  const [playoff, setPlayoff] = useState<boolean | undefined>();

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

  useEffect(() => {
    refetchMatches();
  }, [matchNumber, playoff, refetchMatches]);

  if (leagueIsLoading || leagueError) {
    return (
      <NoDataScreen data='league' />
    )
  } else if (seasonIsLoading || seasonError) {
    return (
      <NoDataScreen data='season' />
    )
  } else if (!matches) {
    return (
      <View style={{flex: 1}} />
    )
  }

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
    dispatch(setMatchSet([next_match, playoff]))
    setMatchNumber(next_match);
    setPlayoff(playoff);
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
    dispatch(setMatchSet([next_match, playoff]));
    setMatchNumber(next_match);
    setPlayoff(playoff);
  }

  if (season!.season_number == 0 || season!.season_number == undefined) {
    return (
      <View style={styles.container}>
        <LeagueHeader />
        {league!.commissioner
          ? <View style={styles.seasonButtonContainer}>
            <CreateButton object='Season' link='/create_season' />
          </View>
          : <></>
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <LeagueHeader />
      <MatchHeader />
      <SteppingBar onGoForward={forwardMatch} onGoBack={backMatch} />
      <MatchList/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  seasonButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }
});
