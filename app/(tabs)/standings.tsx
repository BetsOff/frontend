import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';

import LeagueHeader from '@/components/LeagueHeader';
import SeasonHeader from '@/components/SeasonHeader';
import StandingsTable from '@/components/Standings/StandingsTable';
import NoDataScreen from '../no_data';
import { useRouter } from 'expo-router';
import { useSelectedLeague } from '@/api/leagueQueries';
import { useSelectedSeason } from '@/api/seasonQueries';
import { useEffect } from 'react';
import SeasonChampion from '@/components/Standings/SeasonChampion';
import StartSeasonOrInviteUser from '@/components/StartSeasonOrInviteUser';

export default function StandingsScreen() {
  const {
    data: league,
    isLoading: leagueIsLoading,
    error: leagueError,
  } = useSelectedLeague();

  const {
    data: season,
    isLoading: seasonIsLoading,
    error: seasonError,
    refetch,
  } = useSelectedSeason();

  const router = useRouter();

  useEffect(() => {
    if (league) refetch();
  }, [league]);

  if (leagueIsLoading || leagueError) {
    return (
      <NoDataScreen data='league' />
    );
  } else if (seasonIsLoading || seasonError) {
    return (
      <NoDataScreen data='season' />
    );
  }

  if (!league) return (<NoDataScreen data='league' />);

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    }}>
      {(!!league || leagueIsLoading) && (
        <TouchableOpacity onPress={() => router.push('/league_selector')}>
          <LeagueHeader
            leagueName={league!.name}
            isLoading={leagueIsLoading}
          />
        </TouchableOpacity>
      )}

      {(!season) && (
        <>
          {league!.commissioner
            ? (
              <View style={{
                width: '100%',
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <StartSeasonOrInviteUser />
              </View>
            ) : (
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: 500,
                }}>
                  Ask commissioner to start a season
                </Text>
              </View>
          )}
        </>
      )}

      {(!!season) && (
        <View>
          <TouchableOpacity onPress={() => router.push('/season_selector')}>
            <SeasonHeader
              name={`Season ${season!.season_number}`}
              start_date={season!.start_date}
              end_date={season!.end_date}
            />
          </TouchableOpacity>
          {season.champion && (
            <SeasonChampion champion={season.champion} />
          )}
          <StandingsTable />
        </View>
      )}
    </View>
  );
}
