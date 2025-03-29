import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, useColor, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { logout } from '@/state/AuthSlice';
import { useEffect } from 'react';
import { storageGetItem } from '@/util/Storage';
import axios from 'axios';
import apiRoutes from '@/routes/apiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setProfileStats } from '@/state/ProfileStatsSlice';

export default function ProfileScreen() {
  const color = useColor();
  const dispatch = useDispatch();
  const router = useRouter();
  const profileStats = useSelector((state: RootState) => state.profileStats);

  const signout = async () => {
    logout();
    router.replace('/login');
  }

  useEffect(() => {
    const token = storageGetItem('token');
    if (!token) return;

    const fetchStats = async () => {
      console.log('fetching stats');
      await axios.get(apiRoutes.users.stats, {
        headers: {
          'X-Authorization': `Token ${token}`,
        },
      })
      .then(response => {
        dispatch(setProfileStats(response.data));
      })
    }

    fetchStats();
  }, []);

  if (!profileStats.stats) return (<></>);

  return (
    <View style={styles.container}>
      <Text>{profileStats.stats.lifetime_record.win}</Text>
      <Text>{profileStats.stats.lifetime_record.loss}</Text>
      <Text>{profileStats.stats.lifetime_record.draw}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
