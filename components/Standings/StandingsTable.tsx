import React from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import StandingsRow from './StandingsRow'
import apiRoutes from '@/routes/apiRoutes';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

const StandingsTable = () => {
  const season = useSelector((state: RootState) => state.season.season);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  if (!season) return (<></>);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [])

  const fetchData = async () => {
    if (season.id == 0 || season.id == undefined) {
      return;
    }
    try {
      const response = await axios.get(apiRoutes.season.standings + `?season_id=${season.id}`);
      setStandings(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setStandings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [season]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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
        {standings.map((standing, index) => (
          <StandingsRow
            standing={standing}
            row={index}
            key={index}
          />
        ))}
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