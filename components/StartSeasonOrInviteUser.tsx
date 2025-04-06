import CreateButton from "./CreateButton"
import InviteUser from "./InviteUser"
import { View, Text } from "./Themed"

interface StartSeasonOrInviteUserProps {

}

const StartSeasonOrInviteUser: React.FC<StartSeasonOrInviteUserProps> = ({

}) => {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}>
      <CreateButton object='Season' link='/create_season' />
      <Text style={{
        fontSize: 24,
        fontWeight: 700,
        marginTop: 20,
        margin: 10,
      }}>
        OR
      </Text>
      <InviteUser />
    </View>
  )
}

export default StartSeasonOrInviteUser;
