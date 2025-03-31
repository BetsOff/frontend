import Icons from "@/constants/Icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Colors from "@/constants/Colors";

interface playerIconProps {
  color: string;
  icon: string;
  size: number;
}

const PlayerIcon: React.FC<playerIconProps> = ({ color, icon, size }) => {
  const primaryColor = (Colors.logo as { [key: string]: string })[color]

  switch (icon) {
    case 'bot':
      return <FontAwesome5 name="robot" size={size} color={primaryColor} />
    case Icons.hockey:
      return <MaterialIcons name="sports-hockey" size={size+1} color={primaryColor} />
    case Icons.baseball:
      return <FontAwesome5 name="baseball-ball" size={size} color={primaryColor} />
    case Icons.basketball:
      return <FontAwesome5 name="basketball-ball" size={size} color={primaryColor} />
    case Icons.football:
      return <FontAwesome5 name="football-ball" size={size-1} color={primaryColor} />
    case Icons.cake:
      return <MaterialIcons name="cake" size={size} color={primaryColor} />
    case Icons.crown:
      return <FontAwesome5 name="crown" size={size-6} color={primaryColor} />
    case Icons.smile:
      return <AntDesign name="smile-circle" size={size-2} color={primaryColor} />
    case Icons.plane:
      return <Entypo name="aircraft-take-off" size={size} color={primaryColor} />  
    case Icons.paw:
      return <Entypo name="baidu" size={size} color={primaryColor} />
    case Icons.bowl:
      return <Entypo name="bowl" size={size} color={primaryColor} />
    case Icons.bug:
      return <Entypo name="bug" size={size} color={primaryColor} />
    case Icons.money:
      return <Entypo name="credit" size={size} color={primaryColor} />
    case Icons.flash:
      return <Entypo name="flash" size={size} color={primaryColor} />
    case Icons.feather:
      return <Entypo name="feather" size={size} color={primaryColor} />
    case Icons.flag:
      return <Entypo name="flag" size={size} color={primaryColor} />
    case Icons.flower:
      return <Entypo name="flower" size={size} color={primaryColor} />
    case Icons.controller:
      return <Entypo name="game-controller" size={size} color={primaryColor} />
    case Icons.globe:
      return <Entypo name="globe" size={size} color={primaryColor} />
    case Icons.crosshair:
      return <Entypo name="hair-cross" size={size} color={primaryColor} />
    case Icons.hand:
      return <Entypo name="hand" size={size} color={primaryColor} />
    case Icons.question:
      return <Entypo name="help" size={size} color={primaryColor} />
    case Icons.leaf:
      return <Entypo name="leaf" size={size} color={primaryColor} />
    case Icons.medal:
      return <Entypo name="medal" size={size-2} color={primaryColor} />
    case Icons.note:
      return <Entypo name="note" size={size} color={primaryColor} />
    case Icons.rocket:
      return <Entypo name="rocket" size={size-2} color={primaryColor} />
    case Icons.shield:
      return <Entypo name="shield" size={size} color={primaryColor} />
    case Icons.star:
      return <Entypo name="star" size={size} color={primaryColor} />
    case Icons.trash:
      return <Entypo name="trash" size={size-2} color={primaryColor} />
    case Icons.tree:
      return <Entypo name="tree" size={size-2} color={primaryColor} />
    case Icons.meh:
      return <Feather name="meh" size={size} color={primaryColor} />
    case Icons.female:
      return <FontAwesome name="male" size={size} color={primaryColor} />
    case Icons.male: 
      return <FontAwesome name="female" size={size} color={primaryColor} />
    case Icons.secret:
      return <FontAwesome name="user-secret" size={size-2} color={primaryColor} />
    case Icons.castle:
      return <FontAwesome name="fort-awesome" size={size-8} color={primaryColor} />
    case Icons.snowflake:
      return <FontAwesome name="snowflake-o" size={size} color={primaryColor} />
    case Icons.scale:
      return <FontAwesome5 name="balance-scale" size={size-4} color={primaryColor} />
      default:
      <></>
  }
}

export default PlayerIcon