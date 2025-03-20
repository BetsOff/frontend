import { Text, useColor, View } from '@/components/Themed';
import axios from 'axios';

import React, { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { login } from '@/state/auth/AuthSlice';
import { storageSetItem } from '@/util/Storage';
import apiRoutes from '@/routes/apiRoutes';

const LoginScreen = () => {
  const color = useColor();
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSignUp = () => {
    router.push('/create_account')
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post(apiRoutes.users.login, {
        username: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        storageSetItem('user', response.data.user);
        storageSetItem('user_id', `${response.data.id}`);
        storageSetItem('token', response.data.token);

        dispatch(login());
        router.replace('/(tabs)/standings');
      }

    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setUsername('');
      setPassword('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputView, { borderColor: color.active_text }]}>
        <TextInput
          style={[styles.inputText, { color: color.active_text }]}
          placeholder="Username"
          placeholderTextColor={color.inactive_text}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={[styles.inputView, { borderColor: color.active_text }]}>
        <TextInput
          secureTextEntry
          style={[styles.inputText, { color: color.active_text }]}
          placeholder="Password"
          placeholderTextColor={color.inactive_text}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: color.brand }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: color.background_2 }]} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    borderWidth: 1,
  },
  inputText: {
    height: 50,
  },
  button: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {

  },
});

export default LoginScreen;