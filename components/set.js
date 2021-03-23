import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Set({ set, updateSet, idx }) {
  const [goal, setGoal] = useState(String(set.goal));
  const [reps, setReps] = useState(set.reps);
  const [weight, setWeight] = useState(String(set.weight));

  const changeReps = () => {
    const newReps = reps === 0 ? '' : reps === '' ? goal : reps - 1;
    setReps(newReps);
    updateSet(idx, { goal, reps: newReps, weight });
  };

  const checkReps = () => {
    if (reps > goal) {
      setReps(goal);
      updateSet(idx, { goal, reps: goal, weight });
    } else {
      updateSet(idx, { goal, reps, weight });
    }
  };

  const repStyle =
    reps === ''
      ? [styles.repsBox, { backgroundColor: '#fff' }]
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
        onEndEditing={() => updateSet(idx, { goal, reps, weight })}
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
    // backgroundColor: '#fff',
  },
  input: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
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
