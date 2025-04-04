import { useDispatch, useSelector } from "react-redux";
import { Text, useColor, View } from "../Themed"
import { RootState } from "@/state/store";
import { TouchableOpacity } from "react-native";
import { resetScenario } from "@/state/MatchSlice";

type ScenarioInfoProps = {

}

const ScenarioInfo: React.FC<ScenarioInfoProps> = ({ }) => {
  const color = useColor();
  const dispatch = useDispatch();
  const scenario = useSelector((state: RootState) => state.match.scenario);
  const scenarioOneWin = Object.values(scenario.playerOneWins).reduce((sum, value) => sum + value, 0);
  const scenarioTwoWin = Object.values(scenario.playerTwoWins).reduce((sum, value) => sum + value, 0);
  const scenarioOneLoss = Object.values(scenario.playerOneLosses).reduce((sum, value) => sum + value, 0);
  const scenarioTwoLoss = Object.values(scenario.playerTwoLosses).reduce((sum, value) => sum + value, 0);

  const isScenario = scenarioOneWin > 0 || scenarioTwoLoss < 0 || scenarioOneLoss < 0 || scenarioTwoWin > 0;

  const handleReset = () => {
    dispatch(resetScenario());
  }

  if (!isScenario) return (<></>)

  return (
    <View style={{
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}>
        <View style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '60%',
        }}>
          <Text style={{
            fontStyle: 'italic',
            fontSize: 16,
            fontWeight: 500,
          }}>
            You are viewing a hypothetical scenario.
                </Text>
        </View>
      
      <TouchableOpacity onPress={handleReset} style={{
        borderRadius: 5,
        backgroundColor: color.background_3,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%'
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 600,
        }}>
          Reset
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ScenarioInfo;