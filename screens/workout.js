import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TextInput,
} from 'react-native';
import { Exercise } from '../components';
import firebase from 'firebase';
const { auth, firestore } = firebase;

export default function Workout({ navigation, route }) {
  const [exercises, setExercises] = useState(DBtestData);
  const [title, setTitle] = useState(dummyData.title);
  const [bodyweight, setBodyweight] = useState(dummyData.bodyweight);

  const fetchWorkout = useCallback(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('workouts')
      .doc(route.params.date)
      .get()
      .then((user) => {
        setTitle(user.data().title);
        setBodyweight(user.data().bodyweight);
        setExercises(user.data().exercises);
      })
      .catch(console.log);
  }, [route]);

  const saveWorkout = useCallback(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('workouts')
      .doc(route.params.date)
      .set({ title, bodyweight, exercises })
      .catch(console.log);
  }, [route, title, bodyweight, exercises]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="SAVE" onPress={saveWorkout} />,
    });
  }, [navigation, saveWorkout]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.date,
    });
    fetchWorkout();
  }, [navigation, route, fetchWorkout]);

  const addExercise = () => {
    exercises.push({
      name: 'untitled',
      sets: [{ goal: 5, reps: '', weight: 100 }],
    });
    setExercises(exercises.slice());
  };

  const removeExercise = (idx) => {
    exercises.splice(idx, 1);
    setExercises(exercises.slice());
  };

  const updateExercise = (idx, newInfo) => {
    exercises[idx] = { ...exercises[idx], ...newInfo };
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
      <View style={styles.header}>
        <TextInput value={title} onChangeText={setTitle} />
        <View style={[styles.header, styles.bodyweight]}>
          <Text>BW:</Text>
          <TextInput
            style={styles.bwInput}
            value={String(bodyweight)}
            keyboardType="number-pad"
            onChangeText={setBodyweight}
          />
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 2,
  },
  bodyweight: {
    width: '25%',
  },
  bwInput: {
    width: '100%',
    paddingLeft: 4,
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

const DBtestData = [];
DBtestData.push({ name: 'squats', sets: [] });
DBtestData.push({ name: 'bench', sets: [] });
DBtestData.push({ name: 'rows', sets: [] });
DBtestData[0].sets.push({ goal: 5, reps: 5, weight: 330 });
DBtestData[0].sets.push({ goal: 5, reps: 5, weight: 330 });
DBtestData[0].sets.push({ goal: 5, reps: 5, weight: 330 });
DBtestData[0].sets.push({ goal: 5, reps: 5, weight: 330 });
DBtestData[0].sets.push({ goal: 5, reps: 5, weight: 330 });
DBtestData[1].sets.push({ goal: 5, reps: 5, weight: 265 });
DBtestData[1].sets.push({ goal: 5, reps: 5, weight: 265 });
DBtestData[1].sets.push({ goal: 5, reps: 5, weight: 265 });
DBtestData[1].sets.push({ goal: 5, reps: 4, weight: 265 });
DBtestData[1].sets.push({ goal: 5, reps: 4, weight: 265 });
DBtestData[2].sets.push({ goal: 5, reps: 5, weight: 195 });
DBtestData[2].sets.push({ goal: 5, reps: 5, weight: 195 });
DBtestData[2].sets.push({ goal: 5, reps: 5, weight: 195 });
DBtestData[2].sets.push({ goal: 5, reps: 5, weight: 195 });
DBtestData[2].sets.push({ goal: 5, reps: 5, weight: 195 });
