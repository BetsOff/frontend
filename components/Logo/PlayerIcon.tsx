import Icons from "@/constants/Icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useColor } from "../Themed";
import Colors from "@/constants/Colors";

interface playerIconProps {
  color: string;
  icon: string;
  size: number;
}

const PlayerIcon: React.FC<playerIconProps> = ({ color, icon, size }) => {
  const primaryColor = (Colors.logo as { [key: string]: string })[color]

  switch (icon) {
    case Icons.hockey:
      return <MaterialIcons name="sports-hockey" size={size} color={primaryColor} />
    case Icons.baseball:
      return <FontAwesome5 name="baseball-ball" size={size} color={primaryColor} />
    case Icons.basketball:
      return <FontAwesome5 name="basketball-ball" size={size} color={primaryColor} />
    case Icons.football:
      return <FontAwesome5 name="football-ball" size={size} color={primaryColor} />
    case Icons.cake:
      return <MaterialIcons name="cake" size={size} color={primaryColor} />
    default:
      <></>
  }
}

export default PlayerIcon