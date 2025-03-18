import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import ScoreCard from './ScoreCard';
import { usePlayerOneBetListContext } from '../../context/usePlayerOneBetListContext';
import { usePlayerTwoBetListContext } from '../../context/usePlayerTwoBetListContext';
import { storageGetItem } from '@/util/Storage';
import { useMatchContext } from '../../context/useMatchContext';
import { useEffect } from 'react';
import { useMatchSetContext } from '../../context/useMatchSetContext';

type PlayerVsPlayerProps = {

}

const PlayerVsPlayerHeader: React.FC<PlayerVsPlayerProps> = ({ }) => {
    const { match } = useMatchContext();
    const { matchSet } = useMatchSetContext();
    const { playerOneBetList } = usePlayerOneBetListContext();
    const { playerTwoBetList } = usePlayerTwoBetListContext();

    useEffect(() => {}, [matchSet]);

    if (match.participants == undefined) {
        return (<></>)
    }

    if (match.participants[0] == undefined || match.participants[1] == undefined) {
        return (<></>)
    }

    const user_id: Number = Number(storageGetItem('user_id'))

    const participant1: MatchParticipant = user_id == match.participants[1].user_id
        ? match.participants[1]
        : match.participants[0]

    const participant2: MatchParticipant = user_id == match.participants[1].user_id
        ? match.participants[0]
        : match.participants[1]

    return (
        <View style={styles.container}>
            <ScoreCard 
                name={participant1.user}
                player_color={participant1.color}
                record={participant1.record}
                score={participant1.score}
                credits_remaining={participant1.credits_remaining}
                betList={playerOneBetList}
            />
            <Text style={styles.versus}>VS</Text>
            <ScoreCard 
                name={participant2.user}
                player_color={participant2.color}
                record={participant2.record}
                score={participant2.score}
                credits_remaining={participant2.credits_remaining}
                betList={playerTwoBetList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        margin: 15
    },
    versus: {
        fontSize: 20,
        fontWeight: 500,
    }
})

export default PlayerVsPlayerHeader