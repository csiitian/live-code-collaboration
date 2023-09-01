import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, CheckBox, TextInput, StyleSheet, Pressable } from 'react-native';
import { createRoom, joinRoom } from '../../apis';

export default function Room({isCreate, isJoin, handleSetCode}) {

  const roomTypes = Object.freeze({
    PUBLIC_ROOM: 'Public Room',
    PRIVATE_ROOM: 'Private Room',
  });

  const [roomId, setRoomId] = useState()
  const [password, setPassword] = useState()
  const [roomType, setRoomType] = useState(roomTypes.PUBLIC_ROOM)

  const handleRoomTypeChange = () => {
    if(roomType === roomTypes.PRIVATE_ROOM) {
      setRoomType(roomTypes.PUBLIC_ROOM)
    } else {
      setRoomType(roomTypes.PRIVATE_ROOM)
    }
  }
 
  const removeUnwantedChars = (str) => {
    return str.replace(/[^a-zA-Z0-9 ]/g, '');
  }

  const handleCreateRoom = async () => {
    if(roomType === roomTypes.PRIVATE_ROOM
      && (password === undefined || password.length === 0)) {
      alert("Please Enter Secret Password")
    }
    const response = await createRoom(roomId, password);
    if(response !== null) {
      handleSetCode(roomId);
    }
  }

  const handleJoinRoom = async () => {
    if(roomType === roomTypes.PRIVATE_ROOM
      && (password === undefined || password.length === 0)) {
      alert("Please enter Secret Password")
    }
    const response = await joinRoom(roomId, password);
    if(response !== null) {
      handleSetCode(roomId);
    }
  }

  return (
    <div>
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Room Id"
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          value = {roomId}
          onChangeText = {
            (roomId) => setRoomId(removeUnwantedChars(roomId))
          } />

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={roomType===roomTypes.PRIVATE_ROOM}
            onValueChange={handleRoomTypeChange}
            />
          <Text style={styles.label}>Secret Room</Text>
        </View>

        { roomType === roomTypes.PRIVATE_ROOM ? 
          <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Secret Password"
            placeholderTextColor = "#9a73ef"
            autoCapitalize = "none"
            value = {password}
            onChangeText = {
              (password) => setPassword(password)
            } /> : null }

        <Pressable
          style = {styles.submitButton}
          onPress = {
            () => {
              isCreate ? handleCreateRoom() : handleJoinRoom()
            }
          }>
          <Text style = {styles.submitButtonText}>{ isCreate ? 'Create' : 'Join' } { roomType === roomTypes.PUBLIC_ROOM ? 'Public' : 'Private' } Room</Text>
        </Pressable>
      </View>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '10px',
  },
  input: {
    padding: 10,
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  checkboxContainer: {
    flexDirection: 'row',
    margin: 15,
    alignContent: 'flex-start',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    paddingStart: 10,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText:{
    textAlign: 'center',
    color: 'white'
  }
});
