import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';

import MarketLine from './MarketLine';
import SubmitWager from './SubmitWager';
import { useSelectedLineContext } from '../../context/useSelectedLineContext';
import { useMatchContext } from '../../context/useMatchContext';
import axios from 'axios';
import api from '@/api_url.json'
import { usePlayerOneBetListContext } from '../../context/usePlayerOneBetListContext';
import { useRouter } from 'expo-router';
import { storageGetItem } from '@/util/Storage';
import { emptyMatchSet, useMatchSetContext } from '../../context/useMatchSetContext';
import { formatDateWithTime } from '@/util/date/formatDateWithDayTime';

type LineProps = {
    line: Line;
}

const LineCard: React.FC<LineProps> = ({ line }) => {
    const color = useColor();
    const router = useRouter();
    const { setPlayerOneBetList } = usePlayerOneBetListContext();
    const { selectedLine, setSelectedLine } = useSelectedLineContext();
    const { match } = useMatchContext();
    const { matchSet, setMatchSet } = useMatchSetContext();

    const startTime: Date = new Date(line.start_time);
    
    const h2hSelected: boolean = selectedLine.market == 'h2h'
    const totalsSelected: boolean = selectedLine.market == 'totals'
    let containsSelectedLine: boolean = false
    for (let i = 0; i < line.lines.length; i++) {
        if (line.lines[i].id == selectedLine.id) {
            containsSelectedLine = true
        }
    }

    const handleBetSubmit = async () => {
        try {
            const response = await axios.post(`${api['url']}/bets/create/`, {
                user_id: storageGetItem('user_id'),
                match_id: match.match_id,
                line_id: selectedLine.id,
                first_selection_picked: selectedLine.first_selection_picked,
                wager: selectedLine.wager,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': `Token ${storageGetItem('token')}`
                }
            });
        } catch (error) {
            console.error('Error creating bet', error);
        } finally {
            setSelectedLine({market: '', id: 0, wager: 0, first_selection_picked: false});
            setPlayerOneBetList([]);
            // Cause a re render of live match page
            match.participants[0].credits_remaining = match.participants[0].credits_remaining - selectedLine.wager
            const oldMatchSet = matchSet;
            setMatchSet(emptyMatchSet);
            setMatchSet(oldMatchSet);

            router.back()
        }
        
    }

    const buttonColor = selectedLine.wager > 0
        ? color.brand
        : color.background_3

    return (
        <View>
            <View style={styles.gameHeader}>
                <Text style={styles.gameHeaderText}>{line.away_tag} @ {line.home_tag} | {formatDateWithTime(startTime)} </Text>
            </View>
            <View style={[styles.lineCardContainer, {backgroundColor: color.background_2}]}>
                {line.lines.map((marketLine, index) => (
                    <View style={[{backgroundColor: color.background_2, borderRadius: 10,}]}>
                        <MarketLine
                            line={line}
                            marketLine={marketLine}
                            key={index}
                        />

                        {index !== line.lines.length - 1 && (
                            <View style={[styles.separatorPadding, {backgroundColor: color.background_2}]}>
                                <View style={styles.separator} />
                            </View>
                        )}
                        
                    </View>
                ))}

                {line.lines.map((marketLine, index) => (
                    marketLine.id == selectedLine.id && (
                        <SubmitWager marketLine={line.lines[index]} />
                )))}
            </View>

            {line.lines.map((marketLine, index) => (
                marketLine.id == selectedLine.id && (
                    <TouchableOpacity onPress={handleBetSubmit}>
                        <View style={[styles.button, {backgroundColor: buttonColor}]}>
                            <Text style={styles.submit}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                )))}
        </View>
    )
}

const styles = StyleSheet.create({
    gameHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 10,
    },
    gameHeaderText: {
        fontSize: 20,
        letterSpacing: 1,
        fontWeight: 700,
    },
    lineCardContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 10,
        marginTop: 5,
        borderRadius: 10,
    },
    separatorPadding: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    separator: {
        height: 1,
        width: '90%',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 5,
        paddingVertical: 10,
        borderRadius: 10,
    },
    submit: {
        fontSize: 24,
        fontWeight: 500,
    }
})

export default LineCard