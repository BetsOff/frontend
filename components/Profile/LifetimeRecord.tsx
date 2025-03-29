import { StyleSheet } from 'react-native';
import { View, Text, useColor } from '../Themed';
import { Stats } from '@/state/profile/SelfSlice';

type LifetimeRecordProps = {
  stats: Stats;
}

const LifetimeRecord: React.FC<LifetimeRecordProps> = ({ stats }) => {
  const color = useColor();

  if (!stats) return <></>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lifetime Record</Text>
      <View style={styles.recordContainer}>
        <Text style={[styles.recordText, { color: color.won }]}>W {stats.lifetime_record.win}</Text>
        <Text style={styles.recordText}> / </Text>
        <Text style={[styles.recordText, { color: color.loss }]}>L {stats.lifetime_record.loss}</Text>
        <Text style={styles.recordText}> / </Text>
        <Text style={styles.recordText}>D {stats.lifetime_record.draw}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
  },
  recordContainer: {
    flexDirection: 'row',
  },
  recordText: {
    fontSize: 28,
    fontWeight: 800,
  },
})

export default LifetimeRecord
