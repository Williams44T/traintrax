import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
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
            <TouchableOpacity style={styles.btn} onPress={() => changeSetCount('-')}>
              <Text style={styles.btnTxt}>&lt;</Text>
            </TouchableOpacity>
            <Text>SETS</Text>
            <TouchableOpacity style={styles.btn} onPress={() => changeSetCount('+')}>
              <Text style={styles.btnTxt}>&gt;</Text>
            </TouchableOpacity>
          </View>
            <TouchableOpacity style={styles.btn} onPress={() => removeExercise(idx)}>
              <Text style={styles.btnTxt}>&#10008;</Text>
            </TouchableOpacity>
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
    marginVertical: 5,
    padding: 5,
    backgroundColor: '#ecf2ec',
    elevation: -4,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    padding: 2,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    padding: 2,
  },
  setCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    padding: 2,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: '#fff',
    elevation: 4,
  },
  btnTxt: {
    marginBottom: 3,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sets: {
    width: '100%',
  },
});
