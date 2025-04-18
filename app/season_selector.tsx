import { useSeasons, useSelectedSeason } from '@/api/seasonQueries';
import SeasonHeader from '@/components/SeasonHeader';
import { View } from '@/components/Themed';
import { resetMatches } from '@/state/MatchSlice';
import { setSeason } from '@/state/SeasonSlice';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

export default function SeasonSelectorScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: seasons } = useSeasons();
  const { data: selectedSeason } = useSelectedSeason();

  const handlePress = async (season: Season) => {
    if (season !== selectedSeason) {
      dispatch(setSeason(season));
      dispatch(resetMatches());
      router.back();
    }
  }

  return (
    <View style={{
      flex: 1
    }}>
      <ScrollView>
        {seasons.map((season: Season, index: number) => (
          <TouchableOpacity 
            onPress={() => handlePress(season)}
            key={index}
          >
            <SeasonHeader 
              name={`Season ${season.season_number}`}
              start_date={season.start_date}
              end_date={season.end_date}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}