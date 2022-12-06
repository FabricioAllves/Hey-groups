import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';

import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [type, setType] = useState(false);  //false === Tela Login | true === cadastro

  const navigation = useNavigation();


  function handleLogin() {
    if (type) {
      // Cadastrar usuario
      if (name === '' | email === '' | password === '') return;

      auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.updateProfile({
            displayName: name
          })
            .then(() => {
              navigation.goBack();
            })
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log("E-mail já em uso!")
          }

          if (error.code === 'auth/invalid-email') {
            console.log("E-mail invalido!")
          }
        })

    } else {
      // Logar usuario

      auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') {
            console.log("E-mail invalido!")
          }
        })
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.logo}>HeyGrupos</Text>
      <Text style={{ marginBottom: 20 }}>Ajude, colabore, faça networking!</Text>

      {type && (
        <TextInput
          style={styles.input}
          name={name}
          onChangeText={(text) => setName(text)}
          placeholder="Qual seu nome?"
          placeholderTextColor='#99999b'
        />
      )}

      <TextInput
        style={styles.input}
        name={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Seu E-mail"
        placeholderTextColor='#99999b'
      />
      <TextInput
        style={styles.input}
        name={password}
        onChangeText={(text) => setPassWord(text)}
        placeholder="Password"
        placeholderTextColor='#99999b'
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={[styles.buttonLogin, { backgroundColor: type ? "#51c880" : "#2e54d4" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          {type ? 'Cadastrar' : 'Acessar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setType(!type)}>
        <Text>
          {type ? 'Já possuo uma conta' : 'Criar uma nova conta'}
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    marginTop: Platform.OS === 'android' ? 55 : 80,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000'
  },
  input: {
    color: '#121212',
    backgroundColor: '#ebebeb',
    width: '90%',
    borderRadius: 7,
    marginBottom: 10,
    paddingHorizontal: 8,
    height: 50
  },
  buttonLogin: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 7
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19
  }
})