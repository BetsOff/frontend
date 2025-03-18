import { Text, useColor, View } from '@/components/Themed';
import { useSelectedLeagueContext } from '@/context/useSelectedLeagueContext';
import getIcon from '@/util/Icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

type LeagueChoicesProps = {

}

const LeagueChoices: React.FC<LeagueChoicesProps> = ({ }) => {
    const color = useColor();
    const { selectedLeague, setSelectedLeague } = useSelectedLeagueContext();
    const leagues = ['MLB', 'NFL', 'NBA', 'NHL']
    return (
        <View style={styles.container}>
            {leagues.map((league, index) => (
                <TouchableOpacity style={styles.leagueCell} key={index} onPress={() => setSelectedLeague(league)}>
                    <View>
                        <View style={styles.row}>
                            {getIcon(league, league == selectedLeague ? color.active_text : color.inactive_text, 20)}
                            <Text style={[styles.text, {color: league == selectedLeague ? color.active_text : color.inactive_text}]}>{league}</Text>
                        </View>
                        {league == selectedLeague
                            ? <View style={[styles.selectionStatus, {backgroundColor: color.brand}]}/>
                            : <View style={[styles.selectionStatus]} />
                        }
                    </View>
                </TouchableOpacity> 
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leagueCell: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%'
    },
    text: {
        paddingHorizontal: 5,
        fontSize: 20,
    },
    selectionStatus: {
        marginTop: 5,
        height: 2,
    },
})

export default LeagueChoices