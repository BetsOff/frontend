import { useLeagues } from '@/api/leagueQueries';
import { useinvalidateSeasons, useSeasons } from '@/api/seasonQueries';
import LeagueHeader from '@/components/LeagueHeader';
import { View, Text } from '@/components/Themed';
import { setLeague } from '@/state/leagueSlice';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

export default function LeagueSelectorScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const invalidateSeasons = useinvalidateSeasons();
  const { data: leagues, isLoading } = useLeagues();

  const handlePress = (league: League) => {
    console.log("SELECTING LEAUGE", league.name, league.id)
    dispatch(setLeague(league));
    invalidateSeasons();
    router.back();
  }

  return (
    <View style={{
      flex: 1
    }}>
      <ScrollView>
        {leagues.map((league: League, index: number) => (
          <TouchableOpacity 
            onPress={() => handlePress(league)}
            key={index}
          >
            <LeagueHeader
              leagueName={league!.name}
              isLoading={isLoading}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
