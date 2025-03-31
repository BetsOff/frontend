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
import ProfileHeader from '@/components/Profile/ProfileHeader';
import LifetimeRecord from '@/components/Profile/LifetimeRecord';
import BetAccuracy from '@/components/Profile/BetAccuracy';
import BestGame from '@/components/Profile/BestGame';
import { setProfile } from '@/state/profile/SelfSlice';

export default function ProfileScreen() {
  const color = useColor();
  const dispatch = useDispatch();
  const router = useRouter();
  const profile = useSelector((state: RootState) => state.self);

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
        dispatch(setProfile(response.data));
        console.log(response.data);
      })
      .catch(error => {
        console.log(error)
      })
    }

    fetchStats();
  }, []);

  console.log(profile);
  if (!profile.stats) return (<></>);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {router.push('/edit_logo')}}>
        <ProfileHeader logo={profile.logo} username={profile.username} />
      </TouchableOpacity>
      <LifetimeRecord stats={profile.stats} />
      <BetAccuracy stats={profile.stats} />
      <BestGame stats={profile.stats} />

      <TouchableOpacity onPress={signout}>
        <View style={[styles.signoutButton, { backgroundColor: color.brand }]}>
          <Text style={styles.signoutText}>Sign out</Text>
        </View>
      </TouchableOpacity>
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
  signoutButton: {
    padding: 20,
    borderRadius: 10,
  },
  signoutText: {
    fontSize: 24,
  },
});
