import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useLeagueContext } from '@/context/useLeagueContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { storageGetItem } from '@/util/Storage';
import apiRoutes from '@/routes/apiRoutes';

export default function LeagueScreen() {
  const color = useColor();
  const { league } = useLeagueContext();
  const [user, setUser] = useState('');
  const [members, setMembers] = useState<Member[]>([])

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

  const handleInvite = async () => {
    try {
      const response = await axios.post(apiRoutes.league.invite, {
        league_id: league.id,
        user: user,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Token ${storageGetItem('token')}`
        }
      })

      if (response.status === 201) {
        setUser('')
      }
    } catch (error) {
      setUser('')
      console.error(`Error inviting ${user}: `, error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setMembers(await fetchMembers());
    }
    fetchData();
  }, [league])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{league.name}</Text>
      <View style={styles.members}>
        {members.map((member, index) => (
          <View key={index} style={[styles.memberRow, { backgroundColor: index % 2 == 0 ? color.background_2 : color.background_1 }]}>
            <Text style={styles.memberText}>{member.username}</Text>
          </View>
        ))}
      </View>

      {league.commissioner && (
        <View style={styles.container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Username"
              placeholderTextColor="666"
              value={user}
              onChangeText={setUser}
            />
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: color.brand }]} onPress={handleInvite}>
            <Text style={styles.buttonText}>Invite User</Text>
          </TouchableOpacity>
        </View>
      )}

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
  },
  memberRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  text: {
    fontSize: 32,
    padding: 10,
  },
  inputView: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
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
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
})