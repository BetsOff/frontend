import { StyleSheet } from 'react-native';
import { View, Text } from '../Themed';
import PlayerLogo from '../PlayerLogo';

type ProfileHeaderProps = {
  color: string;
  username: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ color, username }) => {
  return (
    <View style={styles.container}>
      <PlayerLogo color={color} diameter={40} />
      <View>
        <Text style={styles.username}>{username}</Text>
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
