import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import LoginRoom from './src/modules/room';
import Code from './src/modules/code';
  
export default function App() {

  const [roomId, setRoomId] = useState(null);
  const [code, setCode] = useState(false);

  const handleSetCode = (roomId) => { 
    setRoomId(roomId);
    setCode(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {code ? (
        <Code roomId={roomId} />
      ) : (
        <>
          <Text style={styles.text}>Live Code Collaboration</Text>
          <LoginRoom handleSetCode={handleSetCode} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7a42f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24, // Use an appropriate numeric value
    fontFamily: 'Verdana',
    padding: 10, // Use numeric values for padding and margin
    margin: 10,
    color: 'white',
    borderRadius: 10,
  },
});
