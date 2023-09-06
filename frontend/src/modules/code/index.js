import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, View, Text, TextInput, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import io from 'socket.io-client';
import { createCode, fetchCode } from '../../apis';

export default function Code(props) {
  const { roomId } = props;
  const [code, setCode] = useState('');
  const socketRef = useRef(null);
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    sendCode(newCode);
  };

  const sendCode = (code) => {
    socketRef.current.emit('code', code);
    createCode(roomId, code)
      .then((res) => {
        console.log('Update Code:', res);
      })
      .catch((error) => {
        console.error('Error updating code:', error);
      });
  };

  const syncCode = async (roomId) => {
    try {
      const res = await fetchCode(roomId);
      if (res) {
        setCode(res);
      }
    } catch (error) {
      console.error('Error fetching code:', error);
    }
  };

  useEffect(() => {
    socketRef.current = io('http://localhost:3000', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
    });

    socketRef.current.on('connect', () => {
      socketRef.current.emit('join', roomId);
    });

    socketRef.current.on('send-code', (receivedCode) => {
      setCode(receivedCode);
    });

    socketRef.current.on('reconnect', () => {
      console.log('Socket reconnected');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    const interval = setInterval(() => {
      syncCode(roomId);
    }, 1000);
    return () => clearInterval(interval);
  }, [code]);

  return (
    <View style={[styles.container,{ height: windowHeight, width: windowWidth }]}>
      <StatusBar style="auto" />
      <Text style={styles.heading}>VSCode Editor</Text>
      <View style={styles.codeContainer}>
        <TextInput
          multiline={true}
          onChangeText={(newCode) => {
            handleCodeChange(newCode);
          }}
          value={code}
          autoFocus={true}
          style={[styles.code]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    margin: 5,
  },
  heading: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    color: 'white',
    backgroundColor: '#333',
  },
  codeContainer: {
    flex: 1,
  },
  code: {
    fontSize: 16,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
    height: '100%',
  },
});
