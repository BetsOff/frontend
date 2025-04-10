import { useColor, View, Text } from "./Themed"


interface HeaderLoadingProps {
  withDates?: boolean
}

const HeaderLoading: React.FC<HeaderLoadingProps> = ({
  withDates = false
 }) => {
  const color = useColor();

  return (
    <View style={{
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: 15,
      paddingTop: withDates ? 0 : 20,
      width: '100%',
    }}>
      <View style={[{
        backgroundColor: color.background_3,
        borderRadius: 5,
        paddingHorizontal: 5,
        width: '20%',
      }, withDates && {
        marginTop: -2,
        marginBottom: 2,
      }]}>
        <Text style={{
          fontSize: 30,
        }}> </Text>
      </View>
      {withDates && (
        <View style={{
          backgroundColor: color.background_2,
          borderRadius: 5,
          paddingHorizontal: 5,
          width: '30%',
          marginTop: 2,
          marginBottom: -2,
        }}>
          <Text style={{ 
            color: color.inactive_text,
            fontSize: 18,
          }}>{" "}</Text>
        </View>
      )}
    </View> 
  )
}

export default HeaderLoading;
