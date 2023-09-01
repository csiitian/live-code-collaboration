import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import Room from './Room'

export default function LoginRoom({handleSetCode}) {

  const roomLoginTypes = Object.freeze({
    CREATE_ROOM: 'Create Room',
    JOIN_ROOM: 'Join Room',
  });

  const[roomLoginType, setRoomLoginType] = useState(roomLoginTypes.CREATE_ROOM);
  
  const handleCreateRoom = () => {
    setRoomLoginType(roomLoginTypes.CREATE_ROOM)
  }

  const handleJoinRoom = () => {
    setRoomLoginType(roomLoginTypes.JOIN_ROOM)
  }

  return (
    <div>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.rowcontainer}>
          <Text
            style={roomLoginType === roomLoginTypes.CREATE_ROOM ? styles.selectedrowtext : styles.rowtext}
            onPress={handleCreateRoom}>
              Create Room</Text>
          <Text
            style={roomLoginType === roomLoginTypes.JOIN_ROOM ? styles.selectedrowtext : styles.rowtext}
            onPress={handleJoinRoom}>
              Join Room</Text>
        </View>

        {
          roomLoginType === roomLoginTypes.CREATE_ROOM 
            ? <Room isCreate={true} handleSetCode={handleSetCode} /> 
            : <Room isJoin={true} handleSetCode={handleSetCode} />
        }
      </View>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #7a42f4',
    padding: '20px',
  },
  rowcontainer: {
    flex: 1,
    flexDirection: "row",
    padding: '10px',
  },
  selectedrowtext: {
    padding: '10px',
    backgroundColor: '#7a42f4',
    color: 'white',
  },
  rowtext: {
    padding: '10px',
  },
  input: {
    padding: 10,
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  }
});
