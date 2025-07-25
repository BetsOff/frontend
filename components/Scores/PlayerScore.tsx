import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useColor, View } from '@/components/Themed';

import PlayerLogo from '../Logo/PlayerLogo';
import { storageGetItem } from '@/util/Storage';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


type PlayerScoreProps = {
  participant: MatchParticipant;
  winner: string | null;
  starting_credits: number;
  status: string;
}

const PlayerScore: React.FC<PlayerScoreProps> = ({ participant, winner, starting_credits, status }) => {
  const color = useColor();

  if (participant == null) {
    return (<></>)
  }
  var scoreCardBackgroundColor = color.background_3
  var userTextColor = color.active_text

  if (status == 'final') {
    if (winner == participant.user) {
      scoreCardBackgroundColor = color.won
    } else if (winner != null) {
      userTextColor = color.inactive_text
    }
  }

  return (
    <View style={[styles.playerScoreContainer, { backgroundColor: color.background_2 }]}>
      {/* Team Logo */}
      <View style={[styles.logoContainer, { backgroundColor: color.background_2 }]}>
        <PlayerLogo logo={participant.logo} diameter={32} />
      </View>

      {/* Name and Record */}
      <View style={[styles.userContainer, { backgroundColor: color.background_2 }]}>
        <View style={[styles.recordContainer, { backgroundColor: color.background_2 }]}>
          <Text style={[styles.userText, { color: userTextColor }]}>{participant.user}</Text>
          <Text style={[styles.recordText, { color: color.inactive_text }]}>{participant.record}</Text>
        </View>
        {/* Profile Icon if it's user */}
        {participant.user === storageGetItem('user') && (
          <MaterialCommunityIcons name="account" size={28} color={color.inactive_text} />
        )}
      </View>

      {/* Odds or Final */}
      {(status !== 'final' && status !== 'upcoming') ? (
        <View style={[styles.oddsContainer, { backgroundColor: color.background_2 }]}>
          <Text style={{ 
            fontSize: 20,
            fontWeight: 700,
            fontStyle: 'italic',
            color: color.inactive_text,
          }}>
            {participant.chance_of_winning}%
          </Text>
          <Text style={{
            fontSize: 16,
            color: color.inactive_text 
          }}>
            to win
          </Text>
        </View>
      ) : <View style={[styles.oddsContainer, { backgroundColor: color.background_2, width: status == 'final' ? '25%' : '20%' }]}></View>
      }

      {/* Score */}
      {(status !== 'upcoming') ? (
        <View style={[styles.scoreBox, { backgroundColor: scoreCardBackgroundColor }]}>
          <Text style={styles.scoreText}>{participant.score}</Text>
        </View>
      ) : (
        <View style={[styles.oddsContainer, { backgroundColor: color.background_2, width: '25%' }]}>
          <Text style={{ 
            fontSize: 20,
            fontWeight: 700,
            fontStyle: 'italic',
            color: color.inactive_text,
          }}>
            {participant.chance_of_winning}%
          </Text>
          <Text style={{
            fontSize: 16,
            color: color.inactive_text 
          }}>
            to win
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  playerScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '95%',
    paddingVertical: 5,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '13%',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '42%',
  },
  recordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: 5,
  },
  oddsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '25%'
  },
  scoreBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    paddingVertical: 3,
    borderRadius: 5,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 5,
  },
  emptyScoreBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  userText: {
    fontWeight: 500,
    fontSize: 20
  },
  recordText: {
    fontSize: 16
  },
  creditsRemainingText: {
    fontSize: 16
  },
  scoreText: {
    fontSize: 24
  }
})

export default PlayerScore