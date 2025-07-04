import PageRow from '@/components/More/PageRow';
import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';
import * as Updates from 'expo-updates';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { logout } from '@/state/AuthSlice';
import { useRouter } from 'expo-router';
import { useInvalidateAuth } from '@/api/authQueries';
import { storageRemoveItem } from '@/util/Storage';

export default function MoreScreen() {
  const color = useColor();
  const router = useRouter();
  const invalidateAuth = useInvalidateAuth();
  
  const pages = [
    {
      title: "My Leagues",
      icon: (<FontAwesome name="group" size={24} color={color.active_text} />),
      link: '/leagues'
    },
    {
      title: "Invites",
      icon: (<MaterialIcons name="mail" size={24} color={color.active_text} />),
      link: '/invites'
    }
  ]

  const signout = async () => {
    try {
      await invalidateAuth();
      storageRemoveItem('user_id');
      storageRemoveItem('user');
      storageRemoveItem('token');
      router.replace('/login');
    } catch (e) {
      console.log('failed to reload ', e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>More</Text>
      {pages.map((page, index) => (
        <PageRow
          title={page.title}
          icon={page.icon}
          link={page.link}
          row={index}
          key={index}
        />
      ))}

    <TouchableOpacity onPress={signout}>
      <View style={[styles.signoutButton, { backgroundColor: color.brand }]}>
        <Text style={styles.signoutText}>Sign out</Text>
      </View>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    fontSize: 32,
    fontWeight: 500,
    padding: 15,
  },
  signoutButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  signoutText: {
    fontSize: 24,
  },
});