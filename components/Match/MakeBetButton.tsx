import { Text, useColor } from '@/components/Themed';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type MakeBetButtonProps = {

}

const MakeBetButton: React.FC<MakeBetButtonProps> = ({ }) => {
  const color = useColor();
  const router = useRouter();

  const handlePressed = () => {
    router.push('/make_bet');
  }

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color.brand }]} onPress={handlePressed}>
      <Text style={styles.buttonText}>+ Make Bet</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 100,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 500,
    color: 'white',
  },
})

export default MakeBetButton;