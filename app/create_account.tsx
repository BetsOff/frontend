import { useAuthContext } from "@/context/useAuthContext"
import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import axios from 'axios';
import api from '@/api_url.json'
import { useState } from "react";
import { useRouter } from "expo-router";
import { storageSetItem } from "@/util/Storage";

const CreateAccountScreen = () => {
    const color = useColor();
    const { login } = useAuthContext();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleCreateAccount = async () => {
        if (password != confirmPassword) {
            console.error("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(`${api['url']}/users/create-account/`, {
                username: username,
                password: password,
                email: email,
                first_name: firstName,
                last_name: lastName,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.status === 201) {
                storageSetItem('user', response.data.user);
                storageSetItem('user_id', `${response.data.id}`);
                storageSetItem('token', response.data.token);
                login();
                router.replace('/(tabs)/standings');
            }
            
        } catch (error) {
            console.error('Error logging in:', error);
        } finally {
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setEmail('');
            setFirstName('');
            setLastName('');
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.inputView, {borderColor: color.active_text}]}>
                <TextInput 
                    style={[styles.inputText, {color: color.active_text}]}
                    placeholder="email"
                    placeholderTextColor="666"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={[styles.inputView, {borderColor: color.active_text}]}>
                <TextInput
                    style={[styles.inputText, {color: color.active_text}]}
                    placeholder="username"
                    placeholderTextColor="666"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            <View style={[styles.inputView, {borderColor: color.active_text}]}>
                <TextInput
                    secureTextEntry
                    style={[styles.inputText, {color: color.active_text}]}
                    placeholder="password"
                    placeholderTextColor="666"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={[styles.inputView, {borderColor: color.active_text}]}>
                <TextInput
                    secureTextEntry
                    style={[styles.inputText, {color: color.active_text}]}
                    placeholder="confirm password"
                    placeholderTextColor="666"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            {/* <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="first name"
                    placeholderTextColor="666"
                    value={firstName}
                    onChangeText={setFirstName}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="last name"
                    placeholderTextColor="666"
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View> */}
            <TouchableOpacity style={[styles.button, {backgroundColor: color.brand}]} onPress={handleCreateAccount}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 100,
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

export default CreateAccountScreen;