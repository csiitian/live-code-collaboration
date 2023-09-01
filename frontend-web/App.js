import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginRoom from './src/modules/room';
import Code from './src/modules/code';

export default function App() {

  // TODO: Save Session to handle reload

  const [roomId, setRoomId] = useState()
  const [code, setCode] = useState(false)

  const handleSetCode = (roomId) => {
    setRoomId(roomId);
    setCode(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      { code
        ? <Code roomId={roomId} /> 
        : <>
          <Text style={styles.text}>Live Code Collaboration</Text>
          <LoginRoom handleSetCode={handleSetCode}  />
        </>
      }
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
    fontSize: '5vw',
    fontFamily: 'Verdana',
    padding: '10px',
    margin: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderRadius: '10px',
  },
});
