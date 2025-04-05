import { useSeasons } from '@/api/seasonQueries';
import SeasonHeader from '@/components/SeasonHeader';
import { View, Text } from '@/components/Themed';
import { ScrollView, TouchableOpacity } from 'react-native';

export default function SeasonSelectorScreen() {
  const { data: seasons, isLoading } = useSeasons();

  const handlePress = (season: Season) => {

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