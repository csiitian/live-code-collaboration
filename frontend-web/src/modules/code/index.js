import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native'
import io from "socket.io-client";
import { createCode, fetchCode } from '../../apis';

export default function Code(props) {

  const {roomId} = props;
  const [code, setCode] = useState();
  const socket = io('http://localhost:3000');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    sendCode(newCode);
  }

  const sendCode = (code)=>  {
    socket.emit('code', code);
    const res = createCode(roomId, code);
    console.log("Update Code: ", res);
  }

  const syncCode = async (roomId) => {
    const res = await fetchCode(roomId);
    setCode(res.code);
  }

  useEffect(() => {
    socket.emit('join', roomId);
  }, []);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      syncCode(roomId);
    }, 1000);
    //Clearing the interval
    return () => clearInterval(interval);
  }, [code]);

  useEffect(() => {
    socket.on('send-code', (code) => {
      setCode(code);
    });
  }, socket);

  return (
    <div>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.heading}>Room Id: {roomId}</Text>
        <TextInput multiline={true}
          onChangeText={(code) => {
            handleCodeChange(code)
          }}
          defaultValue={code}
          type="text"
          autoFocus={true}
          style={styles.code}
        />
      </View>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7a42f4',
    height: '100vh',
    width: '100vw',
    margin: 5,
  },
  heading: {
    fontSize: '30px',
    textAlign: 'center',
    padding: '10px',
    color: 'white',
  },
  code: {
    fontSize: '24px',
    height: '100vh',
    width: '100vw',
    padding: 10,
    border: '1px solid #7a42f4',
    margin: 5,
    backgroundColor: 'white',
  }
});
