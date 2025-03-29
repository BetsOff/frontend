import { StyleSheet } from 'react-native';
import { View, Text } from '../Themed';
import PlayerLogo from '../PlayerLogo';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

type ProfileHeaderProps = {

}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ }) => {
  const profile = useSelector((state: RootState) => state.profile);

  return (
    <View style={styles.container}>
      <PlayerLogo color={profile.color} diameter={40} />
      <View>
        <Text style={styles.username}>{profile.username}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    paddingLeft: 10,
    fontSize: 40,
    fontWeight: 700,
  },
});

export default ProfileHeader
