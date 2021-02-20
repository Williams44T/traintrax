import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Exercise } from '../components';

export default function Workout() {
  const [exercises, setExercises] = useState(dummyData.exercises);
  const [title, setTitle] = useState(dummyData.title);
  const [bodyweight, setBodyweight] = useState(dummyData.bodyweight);

  const addExercise = () => {
    exercises.push(['untitled', [[5, '', 100]]]);
    setExercises(exercises.slice());
  };

  const removeExercise = (idx) => {
    exercises.splice(idx, 1);
    setExercises(exercises.slice());
  };

  const updateExercise = (idx, newTitle) => {
    exercises[idx][0] = newTitle;
    setExercises(exercises.slice());
  };

  const renderItem = ({ item, index }) => {
    return (
      <Exercise
        exercise={item}
        updateExercise={updateExercise}
        removeExercise={removeExercise}
        idx={index}
      />
    );
  };

  const Footer = () => {
    return <Button title={'ADD EXERCISE'} onPress={addExercise} />;
  };

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <FlatList
        style={styles.exercises}
        data={exercises}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        ListFooterComponent={<Footer />}
        removeClippedSubviews={false}
      />
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
