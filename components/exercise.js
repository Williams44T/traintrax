import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
} from 'react-native';
import { Set } from '../components';

export default function Exercise({
  exercise,
  updateExercise,
  removeExercise,
  idx,
}) {
  const [name, setName] = useState(exercise.name);
  const [sets, setSets] = useState(exercise.sets);

  const changeSetCount = (direction) => {
    if (direction === '+') {
      const last = sets[sets.length - 1];
      exercise.sets.push({ goal: last.goal, reps: '', weight: last.weight });
    } else if (sets.length > 1) {
      exercise.sets.pop();
    }
    updateExercise(idx, { sets: exercise.sets });
    setSets(exercise.sets.slice());
  };

  const updateSet = (setIdx, newSet) => {
    exercise.sets[setIdx] = newSet;
    updateExercise(idx, { sets: exercise.sets });
    setSets(exercise.sets.slice());
  };

  const updateName = (value) => {
    exercise.name = value;
    setName(value);
  };

  const renderItem = ({ item, index }) => {
    return <Set set={item} updateSet={updateSet} idx={index} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={name}
          onChangeText={updateName}
          onEndEditing={() => updateExercise(idx, { name })}
        />
        <View style={styles.toolbar}>
          <View style={styles.setCounter}>
            <Button title={'-'} onPress={() => changeSetCount('-')} />
            <Text>SETS</Text>
            <Button title={'+'} onPress={() => changeSetCount('+')} />
          </View>
          <Button title={'x'} onPress={() => removeExercise(idx)} />
        </View>
      </View>
      <FlatList
        style={styles.sets}
        data={sets}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderWidth: 2,
    padding: 5,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    padding: 2,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    borderWidth: 2,
    padding: 2,
  },
  setCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    borderWidth: 2,
    padding: 2,
  },
  sets: {
    width: '100%',
    borderWidth: 2,
  },
});
