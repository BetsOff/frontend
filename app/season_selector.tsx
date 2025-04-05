import { useInvalidateMatches, useMatches } from '@/api/matchQueries';
import { useSeasons, useSelectedSeason } from '@/api/seasonQueries';
import SeasonHeader from '@/components/SeasonHeader';
import { View, Text } from '@/components/Themed';
import { resetMatches, useMatchSelector } from '@/state/MatchSlice';
import { setSeason } from '@/state/SeasonSlice';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

export default function SeasonSelectorScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: seasons } = useSeasons();
  const { data: selectedSeason } = useSelectedSeason();
  const match = useMatchSelector();
  const invalidateMatches = useInvalidateMatches();

  useEffect(() => {
    console.log('hello');
    console.log(match.matchNumber);
    invalidateMatches();
    // router.back();
  }, [match.matchNumber])

  const handlePress = async (season: Season) => {
    if (season !== selectedSeason) {
      dispatch(setSeason(season));
      dispatch(resetMatches());
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