import { Text, View } from '@/components/Themed';

import LineCard from './LineCard'
import { StyleSheet, ScrollView } from 'react-native';
import { useSelectedLeagueContext } from '../../context/useSelectedLeagueContext';
import { useEffect, useState } from 'react';

import getToday from '@/util/date/getToday';
import axios from 'axios';
import api from '../../api_url.json'
import { storageGetItem } from '@/util/Storage';
import { useMatchContext } from '@/context/useMatchContext';

type LinesListProps = {

}

const LinesList: React.FC<LinesListProps> = ({ }) => {
    const [loading, setLoading] = useState(true);
    const { selectedLeague } = useSelectedLeagueContext();
    const { match } = useMatchContext();
    const [lines, setLines] = useState<Line[]>([]);

    const fetchData = async () => {
        try {
            const fullUrl: string = `${api['url']}/lines/?league=${selectedLeague}&date=${getToday()}`
            const response = await axios.get(fullUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': `Token ${storageGetItem('token')}`
                }
            })
            setLines(response.data)
        } catch (error) {
            console.error('Error fetching lines:', error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [selectedLeague])

    if (loading) {
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        );
      };

    if (lines!.length == 0) {
        return (
            <View style={styles.noGameContainer}>
                <Text style={styles.noGamesText}>No games left today</Text>
            </View>
        )
    }

    return (
        <View style={styles.lineListContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 350 }}>
                {lines!.map((line, index) => (
                    <LineCard line={line} key={index}/>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    lineListContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 0,
        width: '90%',
        height: '100%',
    },
    noGameContainer: {
        paddingVertical: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noGamesText: {
        fontSize: 32,
        fontWeight: 600,
    }
})

export default LinesList