import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import LineListHeader from '@/components/Betting/LineListHeader';
import LinesList from '@/components/Betting/LinesList';
import { useEffect, useState } from 'react';
import { storageGetItem } from '@/util/Storage';
import axios from 'axios';
import apiRoutes from '@/routes/apiRoutes';
import getToday from '@/util/date/getToday';
import { useDispatch } from 'react-redux';
import { setMlbLines, setNbaLines, setNflLines, setNhlLines } from '@/state/LineSlice';

export default function MakeBetScreen() {
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const userId = storageGetItem('user_id');
    const token = storageGetItem('token');
    if (!userId || !token) return;

    const fetchLines = async () => {
      console.log('fetching lines');
      axios.get(apiRoutes.line.get + `?date=${getToday()}`, {
        headers: {
          'X-Authorization': `Token ${token}`
        },
      })
      .then(response => {
        dispatch(setMlbLines(response.data['MLB']));
        dispatch(setNflLines(response.data['NFL']));
        dispatch(setNbaLines(response.data['NBA']));
        dispatch(setNhlLines(response.data['NHL']));
        setDataLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching lines:', error);
        return;
      });
    }

    fetchLines();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <LineListHeader />
      <LinesList />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
