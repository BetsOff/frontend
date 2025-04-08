import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import PlayerVsPlayerHeader from '@/components/Match/PlayerVsPlayerHeader';
import BetList from '@/components/Match/BetList';
import NoDataScreen from '../no_data';
import LeagueHeader from '@/components/LeagueHeader';
import CreateButton from '@/components/CreateButton';
import { storageGetItem } from '@/util/Storage';
import todayInTimeFrame from '@/util/inTimeFrame';
import MakeBetButton from '@/components/Match/MakeBetButton';
import { useSelectedLeague } from '@/api/leagueQueries';
import { useSelectedSeason } from '@/api/seasonQueries';
import { useSelectedMatch } from '@/api/matchQueries';
import ScenarioInfo from '@/components/Match/ScenarioInfo';
import MatchHeader from '@/components/Scores/MatchHeader';

export default function LiveMatchScreen() {
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
    data: matchInfo,
    isLoading: matchIsLoading,
    error: matchError,
  } = useSelectedMatch();

  const match = matchInfo?.matches[0];

  const participantExists = match
    ? match.participants
      ? match.participants[0]
      : false
    : false
  
  const currentUser = participantExists
    ? match!.participants[0].user_id == Number(storageGetItem('user_id'))
    : false

  const isToday = match
    ? todayInTimeFrame(match.start_date, match.end_date)
    : false

  const creditsRemaining = match
    ? match.participants[0]
      ? match.participants[0].credits_remaining > 0
      : false
    : false

  const showMakeBets = currentUser && isToday && creditsRemaining

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'flex-start',
    }}>
      {(leagueError || (!league && !leagueIsLoading)) && (
        <>
          <NoDataScreen data='league' />
        </>
      )}
      {(league && (seasonError || (!season && !seasonIsLoading))) && (
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
      <MatchHeader isLoading={matchIsLoading}/>
      {(matchIsLoading || participantExists) && (
        <PlayerVsPlayerHeader isLoading={matchIsLoading} />
      )}
      {match && <ScenarioInfo />}
      {(matchIsLoading || participantExists) && (
        <BetList isLoading={matchIsLoading}/>
      )} 
      {showMakeBets && (
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '93%',
          borderRadius: 100,
        }}>
          <MakeBetButton />
        </View>
      )}
    </View>
  );
}
