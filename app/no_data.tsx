import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import CreateButton from '@/components/CreateButton';
import { useMembers, useSelectedLeague } from '@/api/leagueQueries';
import { useEffect } from 'react';

type NoDataScreenProps = {
  data: string;
}

const NoDataScreen: React.FC<NoDataScreenProps> = ({ data }) => {
  const { data: members } = useMembers();

  useEffect(() => {

  }, [members]);

  return (
    <View style={styles.container}>
      {data == 'league'
        ? <CreateButton object='league' link='/create_league' />
        : data == 'season'
          ? <CreateButton object='season' link='/create_season' />
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