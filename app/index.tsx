import { Text } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { storageGetItem } from '@/util/Storage';

export default function StartScreen() {
  const router = useRouter();
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (storageGetItem('token') == null) {
        router.replace('/login');
      } else {
        router.replace('/(tabs)/standings');
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Text>Homie bought the pass.</Text>
  )
}
