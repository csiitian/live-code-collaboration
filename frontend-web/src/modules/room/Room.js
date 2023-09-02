import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet, Pressable, CheckBox } from 'react-native';
import { createRoom, joinRoom } from '../../apis';

export default function Room({ isCreate, isJoin, handleSetCode }) {
  const roomTypes = Object.freeze({
    PUBLIC_ROOM: 'Public Room',
    PRIVATE_ROOM: 'Private Room',
  });

  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');
  const [roomType, setRoomType] = useState(roomTypes.PUBLIC_ROOM);

  const handleRoomTypeChange = () => {
    setRoomType(roomType === roomTypes.PRIVATE_ROOM ? roomTypes.PUBLIC_ROOM : roomTypes.PRIVATE_ROOM);
  };

  const removeUnwantedChars = (str) => {
    return str.replace(/[^a-zA-Z0-9 ]/g, '');
  };

  const handleCreateRoom = async () => {
    const isPrivateRoom = roomType === roomTypes.PRIVATE_ROOM;
    if (isPrivateRoom && (!password || password.length === 0)) {
      alert('Please Enter Secret Password');
      return;
    }
    const response = await createRoom(roomId, password, isPrivateRoom);
    if (response !== null) {
      handleSetCode(roomId);
    }
  };

  const handleJoinRoom = async () => {
    const isPrivateRoom = roomType === roomTypes.PRIVATE_ROOM;
    if (isPrivateRoom && (!password || password.length === 0)) {
      alert('Please Enter Secret Password');
      return;
    }
    const response = await joinRoom(roomId, password, isPrivateRoom);
    if (response !== null) {
      handleSetCode(roomId);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Room Id"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        value={roomId}
        onChangeText={(roomId) => setRoomId(removeUnwantedChars(roomId))}
      />

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={roomType === roomTypes.PRIVATE_ROOM}
          onValueChange={handleRoomTypeChange}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Secret Room</Text>
      </View>

      {roomType === roomTypes.PRIVATE_ROOM ? (
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Secret Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      ) : null}

      <Pressable
        style={styles.submitButton}
        onPress={() => {
          isCreate ? handleCreateRoom() : handleJoinRoom();
        }}>
        <Text style={styles.submitButtonText}>
          {isCreate ? 'Create' : 'Join'} {roomType === roomTypes.PUBLIC_ROOM ? 'Public' : 'Private'} Room
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    padding: 10,
    marginVertical: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    paddingStart: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    marginVertical: 15,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
