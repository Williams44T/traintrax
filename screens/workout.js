import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Exercise, Set } from '../components';

export default function Workout() {
  const [exercises, setExercises] = useState(dummyData.exercises);
  const [title, setTitle] = useState(dummyData.title);
  const [bodyweight, setBodyweight] = useState(dummyData.bodyweight);

  const renderItem = ({ item }) => {
    return <Exercise exercise={item} />;
  };

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <FlatList
        style={styles.exercises}
        data={exercises}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
      />
      <Button title={'ADD EXERCISE'} />
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
  exercises: {
    width: '100%',
    borderWidth: 2,
  },
});

const dummyData = {
  title: 'squats-bench-rows',
  bodyweight: 193,
};

const exercises = [];
dummyData.exercises = exercises;

exercises.push(['squats', []]);
exercises.push(['bench', []]);
exercises.push(['rows', []]);

exercises[0][1].push([5, 5, 325]);
exercises[0][1].push([5, 5, 325]);
exercises[0][1].push([5, 5, 325]);
exercises[0][1].push([5, 5, 325]);
exercises[0][1].push([5, 5, 325]);

exercises[1][1].push([5, 5, 265]);
exercises[1][1].push([5, 5, 265]);
exercises[1][1].push([5, 5, 265]);
exercises[1][1].push([5, 4, 265]);
exercises[1][1].push([5, 4, 265]);

exercises[2][1].push([5, 5, 195]);
exercises[2][1].push([5, 5, 195]);
exercises[2][1].push([5, 5, 195]);
exercises[2][1].push([5, 5, 195]);
exercises[2][1].push([5, 5, 195]);
