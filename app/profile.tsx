import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, useColor, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { logout } from '@/state/auth/AuthSlice';

export default function ProfileScreen() {
  const color = useColor();
  const router = useRouter();

  const signout = async () => {
    logout();
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity onPress={signout}>
        <View style={[styles.signoutButton, { backgroundColor: color.brand }]}>
          <Text style={styles.signoutText}>Sign out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signoutButton: {
    padding: 20,
    borderRadius: 10,
  },
  signoutText: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
