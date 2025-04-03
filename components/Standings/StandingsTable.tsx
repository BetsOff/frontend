import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState, useCallback } from 'react';

import StandingsRow from './StandingsRow'
import { useInvalidateStandings, useStandings } from '@/api/seasonQueries';

const StandingsTable = () => {
  const { data: standings, refetch } = useStandings();
  const [refreshing, setRefreshing] = useState(false);
  const invalidateStandings = useInvalidateStandings();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await invalidateStandings();
    await refetch();
    setRefreshing(false);
  }, [invalidateStandings, refetch]);

  return (
    <View style={styles.table}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.seedHeaderCell}>
          <Text style={styles.headerText}></Text>
        </View>
        <View style={styles.playerHeaderCell}>
          <Text style={styles.headerText}>Player</Text>
        </View>
        <View style={styles.infoHeaderCell}>
          <Text style={styles.headerText}></Text>
        </View>
        <View style={styles.recordHeaderCell}>
          <Text style={styles.headerText}>Record</Text>
        </View>
        <View style={styles.pfHeaderCell}>
          <Text style={styles.headerText}>PF</Text>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Data Row */}
        {!standings ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          standings.map((standing, index) => (
            <StandingsRow
              standing={standing}
              row={index}
              key={index}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    width: '100%',
    height: '100%',
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
  },
  seedHeaderCell: {
    width: '11%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerHeaderCell: {
    width: '39%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  infoHeaderCell: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordHeaderCell: {
    width: '20%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pfHeaderCell: {
    width: '20%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default StandingsTable;