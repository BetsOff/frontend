import { useColor, View } from "../Themed";

interface EmptyStandingsRowProps {
  row: number
}

const EmptyStandingsRow: React.FC<EmptyStandingsRowProps> = ({ row }) => {
  const color = useColor();
  const backgroundColor = row % 2 == 0
    ? color.background_2
    : color.background_1

  return (
    <View style={{
      backgroundColor: backgroundColor,
      flexDirection: 'row',
      width: '100%',
      height: 44,
    }} />
  )
}

export default EmptyStandingsRow;