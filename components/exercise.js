import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Set } from '../components';

export default function Exercise({ exercise }) {
  const [title, setTitle] = useState(exercise[0]);
  const [sets, setSets] = useState(exercise[1]);

  const renderItem = ({ item }) => {
    return <Set set={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{title}</Text>
        <View style={styles.toolbar}>
          <View style={styles.setCounter}>
            <Button title={'+'} />
            <Text>SETS</Text>
            <Button title={'-'} />
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
