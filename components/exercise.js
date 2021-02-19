import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default function Exercise({ exercise }) {
  const renderItem = ({ item }) => {
    return <Text>{item[0]}</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{exercise[0]}</Text>
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
        data={exercise[1]}
        keyExtractor={(_, i) => i}
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
