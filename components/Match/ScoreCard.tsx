import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { getLogoColor } from '@/util/getLogoColor';
import calcualtePointsWon from '@/util/calculatePointsWon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useRouter } from 'expo-router';
import { setUserId } from '@/state/profile/ProfileSlice';
import PlayerIcon from '../Logo/PlayerIcon';
import { storageGetItem } from '@/util/Storage';
import { useMatches } from '@/api/matchQueries';

type ScoreCardProps = {
  user_id: number,
  name: string,
  logo: Logo,
  record: string,
  score: number;
  playerIndex: 0 | 1;
  credits_remaining: number;
  betList: LeagueBets[];
}

const getTotalPotentialPoints = (betList: LeagueBets[]): number => {
  let result = 0;
  for (let i = 0; i < betList.length; i++) {
    let leagueBetList = betList[i]
    for (let j = 0; j < leagueBetList.games.length; j++) {
      let game = leagueBetList.games[j]
      for (let k = 0; k < betList[i].games[j].wagers.length; k++) {
        let wager = game.wagers[k]
        result += wager.points_earned
        if (betList[i].games[j].status != "Final") {
          let selectionPrice = wager.first_selection_picked
            ? wager.first_price
            : wager.second_price
          result += calcualtePointsWon(wager.wager, selectionPrice)
        }
      }
    }
  }
  return Math.round(result * 100) / 100
}

const formatScore = (score: number) => {
  return score % 1 === 0 ? score.toString() : parseFloat(score.toFixed(2)).toString();
}

const ScoreCard: React.FC<ScoreCardProps> = ({ 
  user_id, 
  name, 
  logo, 
  record, 
  score, 
  playerIndex,
  credits_remaining, 
  betList 
}) => {
  const color = useColor();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: matches } = useMatches();
  const scenario = useSelector((state: RootState) => state.match.scenario);
  const logoColor = getLogoColor(logo.bg_color);

  const scenarioWin = playerIndex === 0
    ? Object.values(scenario.playerOneWins).reduce((sum, value) => sum + value, 0)
    : Object.values(scenario.playerTwoWins).reduce((sum, value) => sum + value, 0)

  const scenarioLoss = playerIndex === 0
    ? Object.values(scenario.playerOneLosses).reduce((sum, value) => sum + value, 0)
    : Object.values(scenario.playerTwoLosses).reduce((sum, value) => sum + value, 0)

  const potentialPoints = getTotalPotentialPoints(betList) + scenarioLoss;
  score = score + scenarioWin;

  const roundScores = (score != potentialPoints) && (score >= 100 || potentialPoints >= 100) && (score != 0)

  const isScenario = scenarioWin > 0 || scenarioLoss < 0;

  const handleProfilePressed = () => {
    if (String(user_id) == storageGetItem('user_id')) {
      router.replace('/(tabs)/profile');
    } else {
      router.push('/other_profile');
    }
    dispatch(setUserId(user_id));
  }

  if (!matches) return (<></>);

  const scoreStyle = score >= 100 && score != potentialPoints
    ? styles.smallScore
    : styles.score

  const textColor = logo.bg_color == 'white'
    ? '#666666'
    : 'white'

  const nameStyle = name.length > 10
    ? [styles.longName, { color: textColor }]
    : [styles.name, { color: textColor }]

  return (
    <View style={[styles.scoreCardContainer, { backgroundColor: logoColor, borderColor: color.active_text }]}>
      <TouchableOpacity onPress={handleProfilePressed}>
        <View style={[styles.innerScoreCardContainer, { backgroundColor: logoColor, borderColor: color.active_text }]}>
          <View style={[styles.playerContainer, { backgroundColor: logoColor, borderColor: color.active_text }]}>
            <PlayerIcon color={logo.color} icon={logo.icon} size={24} />
            <View style={[styles.nameAndScoreContainer, { backgroundColor: logoColor, borderColor: color.active_text }]}>
              <Text style={nameStyle}>{name}</Text>
              <Text style={styles.record}>{record}</Text>
            </View>
          </View>
          <View style={[styles.scoreContainer, { backgroundColor: logoColor }]}>
            <Text style={[
              scoreStyle, 
              { color: textColor },
              isScenario && { fontStyle: 'italic' }
            ]}>
              {roundScores
                ? score.toFixed(1)
                : formatScore(score)
              }
            </Text>
            {(score != potentialPoints) && (
              <Text style={[
                styles.potentialScore,
                isScenario && { fontStyle: 'italic' }
              ]}> 
                /{roundScores
                  ? ' ' + potentialPoints.toFixed(1)
                  : ' ' + formatScore(potentialPoints)
                }
              </Text>
            )}
          </View>
          <Text style={[styles.remaining_credits, { color: textColor }]}>Credits: {credits_remaining}/{matches.starting_credits}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  scoreCardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    width: '42%',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameAndScoreContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  innerScoreCardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative',
  },
  scoreWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 500,
  },
  longName: {
    paddingVertical: 2,
    fontSize: 16,
    fontWeight: 500,
  },
  record: {
    fontSize: 16,
    color: '#BBBBBB'
  },
  score: {
    fontSize: 36,
    fontWeight: 700,
  },
  smallScore: {
    fontSize: 30,
    fontWeight: 700,
    paddingVertical: 3,
  },
  potentialScore: {
    fontSize: 16,
    color: '#BBBBBB',
    marginLeft: 5,
    bottom: '5%',
  },
  remaining_credits: {
    fontSize: 16,
    color: '#FFF',
  }
})

export default ScoreCard