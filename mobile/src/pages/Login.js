import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, Platform, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login( {navigation }){

    useEffect(() => {
        AsyncStorage.getItem('user').then(user =>{
            if(user){
                navigation.navigate('Main', { user: user });
            }
        })
    }, []);

    const [user, setUser] = useState('');

    async function handleLogin(){
        const response = await api.post('/devs',{ username: user });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { user: _id });

    }


    return (
        <KeyboardAvoidingView
         style={styles.container}
         behavior="padding" 
         enabled={Platform.OS == "ios"}
        >
            <Image source={logo} />
            <TextInput 
                placeholder="Digite seu usuário no Github" 
                placeholderTextColor="#999"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView
        >
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#f5f5f5', 
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30
    },
  
    input: {
      height:46,
      alignSelf: 'stretch',
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4,
      marginTop: 20,
      paddingHorizontal: 15
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },

  
  });