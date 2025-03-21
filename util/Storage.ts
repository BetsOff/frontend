import * as SecureStore from 'expo-secure-store';

export async function storageSetItem(key: string, val: string) {
  SecureStore.setItem(key, val);
}

export function storageGetItem(key: string): string | null {
  const value = SecureStore.getItem(key);
  return value;
}

export async function storageRemoveItem(key: string) {
  await SecureStore.deleteItemAsync(key);
}
