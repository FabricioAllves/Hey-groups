import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export default function ModalNewRoom({ setVisible, setUpdateScreen }) {
  const [roomName, setRoomName] = useState('');

  const user = auth().currentUser.toJSON();

  function handleButtonCreate() {
    if(roomName === '') return;

    // Deixar apenas cada usuario criar 4 grupos!
    firestore().collection('MESSAGE_THREADS')
    .get()
    .then((snapshot) => {
      let myThreads = 0;

      snapshot.docs.map( docItem => {
        if(docItem.data().owner == user.uid){
          myThreads += 1;
        }
      })

      if(myThreads >= 4){
        alert("Você já atingiu o limite de grupos por usuario.")
      }else{
        createRoom()
      }
    })

  }

  // Create nova sala no firestore
  function createRoom(){
    firestore()
    .collection('MESSAGE_THREADS')
    .add({                             // esse add criar um id unico automatico 
      name: roomName,
      owner: user.uid,
      lastMessage:{
        text: `Grupo ${roomName} criado. Bem vindo(a)!`,
        createdAt: firestore.FieldValue.serverTimestamp(),
      }
    })   // Quando esse ducmento for criado ai no then recebera o docRef
    .then((docRef) => {
      docRef.collection('MESSAGES')
      .add({
        text: `Grupo ${roomName} criado. Bem vindo(a)!`,
        createdAt: firestore.FieldValue.serverTimestamp(),
        system: true
      })
      .then(()=>{
        setVisible();
        setUpdateScreen()
      })
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={styles.modal}></View>
      </TouchableWithoutFeedback>

      <View style={styles.modalContent}>
        <Text style={styles.title}>Criar um novo Grupo?</Text>
        <TextInput
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
          placeholder="Nome para sua sala?"
          style={styles.input}
        />

        <TouchableOpacity style={styles.buttonCreate} onPress={handleButtonCreate}>
          <Text style={styles.buttonText}>Criar sala</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={setVisible}>
          <Text>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(34,34,34, 0.4)'
  },
  modal: {
    flex: 1
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
    color: '#000'
  },
  input: {
    borderRadius: 5,
    height: 45,
    backgroundColor: '#ddd',
    marginVertical: 15,
    paddingHorizontal: 10,
    fontSize: 16
  },
  buttonCreate: {
    borderRadius: 5,
    backgroundColor: '#2e54d4',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '500',
    color: '#fff'
  },
  backButton: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }

})