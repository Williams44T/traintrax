import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Set({ set }) {
  const [goal, setGoal] = useState(String(set[0]));
  const [reps, setReps] = useState(set[1]);
  const [weight, setWeight] = useState(String(set[2]));

  const changeReps = () => {
    reps === 0 ? setReps('') : reps === '' ? setReps(goal) : setReps(reps - 1);
  };

  const checkReps = () => {
    reps > goal ? setReps(goal) : null;
  };

  const repStyle =
    reps === ''
      ? [styles.repsBox, { backgroundColor: 'lightgrey' }]
      : styles.repsBox;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType={'number-pad'}
        value={goal}
        onChangeText={setGoal}
        onEndEditing={checkReps}
      />
      <TouchableOpacity style={repStyle} onPress={changeReps}>
        <Text style={styles.repsText}>{reps}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        keyboardType={'number-pad'}
        value={weight}
        onChangeText={setWeight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  input: {
    textAlign: 'center',
    fontSize: 12,
  },
  repsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 100,
    elevation: 4,
    backgroundColor: 'red',
  },
  repsText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
