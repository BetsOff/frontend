
import { useSelectedLeague } from '@/api/leagueQueries';
import { useColor, View, Text } from '@/components/Themed';
import apiRoutes from '@/routes/apiRoutes';
import { storageGetItem } from '@/util/Storage';
import axios from 'axios';
import { useState } from 'react';
import { Alert, TextInput, TouchableOpacity } from 'react-native';

interface InviteUserProps {

}

const InviteUser: React.FC<InviteUserProps> = ({ }) => {
  const [user, setUser] = useState('');
  const color = useColor();
  const { data: league } = useSelectedLeague();

  if (!league) return (<></>)

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
        Alert.alert(
          'Invite Successful',
          `Successfully invited ${user} to ${league.name}`,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
        setUser('')
      }
    } catch (error) {
      Alert.alert(
        'Invite Failed',
        `Failed to invite ${user} to ${league.name}`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
      setUser('')
    }
  }

  return (
    <View style={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    }}>
      <View style={{
        flexDirection: 'row',
        width: '40%',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        padding: 20,
        borderColor: color.active_text,
        borderWidth: 1,
      }}>
        <TextInput
          style={{
            height: 50,
            color: color.active_text,
          }}
          placeholder="Username"
          placeholderTextColor="666"
          value={user}
          onChangeText={setUser}
        />
      </View>
      <TouchableOpacity 
        style={{
          width: '40%',
          borderRadius: 25,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
          backgroundColor: color.brand,
        }}
        onPress={handleInvite}
      >
        <Text style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 600,
        }}>
          Invite User
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default InviteUser