import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';

import { getLogoColor } from '@/util/getLogoColor';
import calcualtePointsWon from '@/util/calculatePointsWon';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

type ScoreCardProps = {
  name: string,
  player_color: string,
  record: string,
  score: number;
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

const ScoreCard: React.FC<ScoreCardProps> = ({ name, player_color, record, score, credits_remaining, betList }) => {
  const color = useColor();
	const matches =  useSelector((state: RootState) => state.match.matches);
  const logoColor = getLogoColor(player_color);

  const potentialPoints = getTotalPotentialPoints(betList);

  if (!matches) return (<></>);

  const scoreStyle = score >= 100 && score != potentialPoints
    ? styles.smallScore
    : styles.score

  const textColor = player_color == 'white'
    ? '#666666'
    : 'white'

  const nameStyle = name.length > 10
    ? [styles.longName, { color: textColor }]
    : [styles.name, { color: textColor }]

  return (
    <View style={[styles.scoreCardContainer, { backgroundColor: logoColor, borderColor: color.active_text }]}>
      <Text style={nameStyle}>{name}</Text>
      <Text style={styles.record}>{record}</Text>
      <View style={[styles.scoreContainer, { backgroundColor: logoColor }]}>
        <Text style={[scoreStyle, { color: textColor }]}>{score}</Text>
        {(score != potentialPoints) && (
          <Text style={styles.potentialScore}>/ {potentialPoints}</Text>
        )}

      </View>
      <Text style={[styles.remaining_credits, { color: textColor }]}>Credits: {credits_remaining}/{matches.starting_credits}</Text>
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
    fontSize: 24,
    fontWeight: 500,
  },
  longName: {
    paddingVertical: 2,
    fontSize: 20,
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