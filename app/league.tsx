import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { storageGetItem } from '@/util/Storage';
import apiRoutes from '@/routes/apiRoutes';
import { useSelectedLeague } from '@/api/leagueQueries';
import { useRouter } from 'expo-router';
import { setUserId } from '@/state/profile/ProfileSlice';
import { useDispatch } from 'react-redux';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import InviteUser from '@/components/InviteUser';

export default function LeagueScreen() {
  const dispatch = useDispatch();
  const color = useColor();
  const router = useRouter();
  const { data: league } = useSelectedLeague();
  const [user, setUser] = useState('');
  const [members, setMembers] = useState<Member[]>([])

  if (!league) {
    return (<></>);
  }

  const fetchMembers = async () => {
    try {
      const response = await axios.get(apiRoutes.league.getUsers + `?league_id=${league.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Token ${storageGetItem('token')}`,
        }
      });

      if (response.status == 200) {
        return response.data;
      }
      return []
    } catch (error) {
      console.error('Error fetching members: ', error);
      return [];
    }
  }

  const handleUserPressed = (userId: number) => {
    dispatch(setUserId(userId));
    router.push('/other_profile')
  }

  useEffect(() => {
    const fetchData = async () => {
      setMembers(await fetchMembers());
    }
    fetchData();
  }, [league]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{league.name}</Text>

      {league.commissioner && (
        <InviteUser />
      )}

      <View style={styles.members}>
        {members.map((member, index) => (
          <TouchableOpacity 
            onPress={() => handleUserPressed(member.id)}
            key={index}
            style={[styles.memberRow, { backgroundColor: index % 2 == 0 ? color.background_2 : color.background_1 }]}
          >
            
            <Text style={styles.memberText}>{member.username}</Text>
            {member.commissioner && (
              <FontAwesome5 style={[{ paddingRight: 5 }]} name="crown" size={18} color={color.inactive_text} />
            )}
            {String(member.id) === storageGetItem('user_id') && (
              <MaterialCommunityIcons name="account" size={24} color={color.inactive_text} />
            )}
          </TouchableOpacity>
        ))}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  members: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  memberText: {
    fontSize: 20,
    fontWeight: 500,
    paddingHorizontal: 10,
  },
  memberRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    paddingVertical: 10,
  },
  text: {
    fontSize: 32,
    padding: 10,
    fontWeight: 700,
  },
  inputView: {
    width: '40%',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    padding: 20,
    borderColor: '#fff',
    borderWidth: 1,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  button: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 600,
  },
})

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
