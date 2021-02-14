import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';

export default function Profile() {

  const signOut = () => {
    firebase.auth().signOut()
  }

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button title="Log Out" onPress={signOut} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
