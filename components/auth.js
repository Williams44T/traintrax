import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase';

const { auth, firestore } = firebase;

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    auth().signInWithEmailAndPassword(email, password).catch(console.log);
  };

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firestore().collection('users').doc(res.user.uid).set({ email });
      })
      .catch(console.log);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to TrainTrax!</Text>
      <TextInput
        style={styles.accountInput}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.accountInput}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={signIn} />
        <Button title="Sign Up" onPress={signUp} />
      </View>
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
  title: {
    fontSize: 30,
    fontWeight: '500',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  accountInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '75%',
    margin: 10,
    fontSize: 22,
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '75%',
    marginTop: 30,
  },
});
