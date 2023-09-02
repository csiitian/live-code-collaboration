import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import Room from './Room';

export default function LoginRoom({ handleSetCode }) {
  const [roomLoginType, setRoomLoginType] = useState('Create Room');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.rowContainer}>
        <Text
          style={[
            styles.rowText,
            roomLoginType === 'Create Room' && styles.selectedRowText,
          ]}
          onPress={() => setRoomLoginType('Create Room')}>
          Create Room
        </Text>
        <Text
          style={[
            styles.rowText,
            roomLoginType === 'Join Room' && styles.selectedRowText,
          ]}
          onPress={() => setRoomLoginType('Join Room')}>
          Join Room
        </Text>
      </View>

      <View style={styles.roomContainer}>
        {roomLoginType === 'Create Room' ? (
          <Room isCreate={true} handleSetCode={handleSetCode} />
        ) : (
          <Room isJoin={true} handleSetCode={handleSetCode} />
        )}
      </View>

      {/* Additional Text and Design Elements */}
      <Text style={styles.infoText}>
        Welcome to Live Code Collaboration!
      </Text>
      <Text style={styles.infoText}>
        Collaborate with your team in real-time using this platform.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#7a42f4',
    borderWidth: 1,
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 20,
  },
  selectedRowText: {
    paddingHorizontal: 10,
    backgroundColor: '#7a42f4',
    color: 'white',
    fontWeight: 'bold',
  },
  rowText: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  roomContainer: {
    width: '100%',
  },
  input: {
    padding: 10,
    marginVertical: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    marginVertical: 15,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoText: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});
