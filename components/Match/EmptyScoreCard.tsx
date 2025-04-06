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

type EmptyScoreCardProps = {

}

const EmptyScoreCard: React.FC<EmptyScoreCardProps> = ({ 

}) => {
  const color = useColor();

  return (
    <View style={{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 2,
      width: '42%',
      height: 93,
      borderRadius: 10,
      backgroundColor: color.background_2, 
    }}>
        {/* <View style={[styles.innerScoreCardContainer, { backgroundColor: logoColor, borderColor: color.active_text }]}>
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
        </View> */}
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

export default EmptyScoreCard