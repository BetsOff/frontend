import Icons from "@/constants/Icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

interface playerIconProps {
  color: string;
  icon: string;
  size: number;
}

const PlayerIcon: React.FC<playerIconProps> = ({ color, icon, size }) => {
  switch (icon) {
    case Icons.hockey:
      return <MaterialIcons name="sports-hockey" size={size} color={color} />
    case Icons.baseball:
      return <FontAwesome5 name="baseball-ball" size={size} color={color} />
    case Icons.basketball:
      return <FontAwesome5 name="basketball-ball" size={size} color={color} />
    case Icons.football:
      return <FontAwesome5 name="football-ball" size={size} color={color} />
    case Icons.cake:
      return <MaterialIcons name="cake" size={size} color={color} />
    default:
      <></>
  }
}

export default PlayerIcon