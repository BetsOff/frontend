import { StyleSheet, TouchableOpacity } from 'react-native';

import { useColor, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { storageGetItem } from '@/util/Storage';
import axios from 'axios';
import apiRoutes from '@/routes/apiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setProfile } from '@/state/profile/ProfileSlice';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import LifetimeRecord from '@/components/Profile/LifetimeRecord';
import BetAccuracy from '@/components/Profile/BetAccuracy';
import BestGame from '@/components/Profile/BestGame';

export default function OtherProfileScreen() {
  const color = useColor();
  const dispatch = useDispatch();
  const router = useRouter();
  const profile = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    const token = storageGetItem('token');
    if (!token) return;

    const fetchStats = async () => {
      console.log('fetching stats');
      const query = `?user_id=${profile.user_id}`
      await axios.get(apiRoutes.users.stats + query, {
        headers: {
          'X-Authorization': `Token ${token}`,
        },
      })
      .then(response => {
        dispatch(setProfile(response.data));
      })
    }

    fetchStats();
  }, [dispatch]);

  if (!profile.stats) return (<></>);

  return (
    <View style={styles.container}>
      <ProfileHeader color={profile.color} username={profile.username} />
      <LifetimeRecord stats={profile.stats} />
      <BetAccuracy stats={profile.stats} />
      <BestGame stats={profile.stats} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
});
