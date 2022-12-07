import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';

import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import FabButton from '../../components/FabButton';
import ModalNewRoom from '../../components/ModalNewRoom';

export default function ChatRoom() {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)

  function handleSignOut() {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('SignIn')
      })
      .catch(() => {
        console.log("Nao possui nenhum usuario")
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>
        <View style={styles.headerRoomLeft}>
          <TouchableOpacity onPress={handleSignOut}>
            <Icon name='arrow-back' size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Grupos</Text>
        </View>

        <TouchableOpacity>
          <Icon name='search' size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FabButton setVisible={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalNewRoom setVisible={() => setModalVisible(false)}/>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRoom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2e54d4',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  headerRoomLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'vold',
    color: '#fff',
    paddingLeft: 10
  }
})