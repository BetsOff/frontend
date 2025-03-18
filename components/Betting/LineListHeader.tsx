import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import { useMatchContext } from '../../context/useMatchContext';
import { useMatchSetContext } from '../../context/useMatchSetContext';
import formatDateWithDay from '@/util/date/formatDateWithDay';
import LeagueChoices from './LeagueChoices';

type LineListHeaderProps = {

}

const LineListHeader: React.FC<LineListHeaderProps> = ({ }) => {
    const { match } = useMatchContext();
    const { matchSet } = useMatchSetContext();
    const date = formatDateWithDay(new Date());

    if (match.participants[0].credits_remaining == undefined) {
        return (<></>)
    }

    const credits_remaining = match.participants[0].credits_remaining

    return (
        <View style={styles.headerContainer}>
            <View style={styles.row}>
                <Text style={styles.title}>{date}</Text>
                <View style={styles.creditsRemainingContainer}>
                    <Text style={styles.credits}>{credits_remaining} / {matchSet.starting_credits}</Text>
                    <Text style={styles.remainingText}>credits remaining</Text>
                </View>
            </View>
            <LeagueChoices />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    },
    title: {
        fontSize: 20,
    },
    league: {
        fontSize: 24,
        fontWeight: 500,
    },
    creditsRemainingContainer: {
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    credits: {
        fontSize: 20,
        fontWeight: 500,
    },
    remainingText: {
        fontSize: 16
    }
})

export default LineListHeader