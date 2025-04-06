import { useStandings } from "@/api/seasonQueries";
import { View, Text } from "../Themed";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import PlayerLogo from "../Logo/PlayerLogo";

type SeasonChampionProps = {
  champion: string;
}

const SeasonChampion: React.FC<SeasonChampionProps> = ({ champion }) => {
  const { data: standings } = useStandings();

  if (!standings) return (<></>);

  const index = standings?.findIndex(standing => standing.user === champion);
  const user = standings[index]

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
    }}>
      <FontAwesome5 name="trophy" size={32} color={"#ccb118"} />
      <View style={{
        marginHorizontal: 10,
      }}/>
      <PlayerLogo logo={user.logo} diameter={30}/>
      <Text style={{
        fontSize: 28,
        fontWeight: 700,
        marginHorizontal: 10,
      }}>
        {user.user}
      </Text>
    </View>
  )
}

export default SeasonChampion