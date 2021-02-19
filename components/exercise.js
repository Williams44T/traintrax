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

export default function Exercise({ exercise, updateExercise, idx }) {
  const [title, setTitle] = useState(exercise[0]);
  const [sets, setSets] = useState(exercise[1]);

  const changeSetCount = (direction) => {
    if (direction === '+') {
      const last = sets[sets.length - 1];
      sets.push([last[0], '', last[2]]);
    } else if (sets.length > 1) {
      sets.pop();
    }

    setSets(sets.slice());
  };

  const updateSet = (setIdx, newSet) => {
    sets[setIdx] = newSet;
    setSets(sets.slice());
  };

  const renderItem = ({ item, index }) => {
    return <Set set={item} updateSet={updateSet} idx={index} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          onEndEditing={() => updateExercise(idx, title)}
        />
        <View style={styles.toolbar}>
          <View style={styles.setCounter}>
            <Button title={'-'} onPress={() => changeSetCount('-')} />
            <Text>SETS</Text>
            <Button title={'+'} onPress={() => changeSetCount('+')} />
          </View>
          <Button title={'x'} />
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
