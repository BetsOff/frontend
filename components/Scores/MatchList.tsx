import React, { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, View } from '@/components/Themed';

import Match from './Match';
import { useInvalidateMatches, useMatches } from '@/api/matchQueries';
import EmptyMatch from './EmptyMatch';

type MatchesProps = {
  isLoading: boolean;
}

const MatchList: React.FC<MatchesProps> = ({ 
  isLoading = false,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: matchSet, refetch } = useMatches();
  const invalidateMatches = useInvalidateMatches();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await invalidateMatches();
    await refetch();
    setRefreshing(false);
  }, [invalidateMatches, refetch]);

  if (isLoading) return (
    <View style={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '55%',
    }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <EmptyMatch key={i}/>
        ))}
    </View>
  );

  if (!matchSet) return (<></>);

  const matches = matchSet.matches;
  const status = matchSet.status;

  return (
    <View style={styles.matchListContainer}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {matches.map((match: Match, index: number) => (
          <Match
            match={match}
            key={index}
            status={status}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  matchListContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '75%',
  },
})

export default MatchList