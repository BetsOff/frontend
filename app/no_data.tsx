import { StyleSheet } from 'react-native';

import { useColor, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import CreateButton from '@/components/CreateButton';

type NoDataScreenProps = {
    data: string;
}

const NoDataScreen: React.FC<NoDataScreenProps> = ({ data }) => {
    const color = useColor();
    const router = useRouter();

    const handleCreateLeague = () => {
        router.push('/create_league');
    }

    return (
        <View style={styles.container}>
            {data == 'league'
                ? <CreateButton object='league' link='/create_league' />
                : data == 'season'
                    ? <CreateButton object='league' link='/create_season' />
                    : <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        margin: 20,
        padding: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    }
})

export default NoDataScreen