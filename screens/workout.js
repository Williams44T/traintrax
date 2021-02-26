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
import { Ionicons } from '@expo/vector-icons';
import cache from '../dbCache';
const { auth, firestore } = firebase;

export default function Workout({ navigation, route }) {
  const { workout, date, updateWorkout } = route.params;
  const [exercises, setExercises] = useState(workout.exercises);
  const [title, setTitle] = useState(workout.title);
  const [bodyweight, setBodyweight] = useState(workout.bodyweight);

  const saveWorkout = useCallback(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('workouts')
      .doc(date)
      .set({ title, bodyweight, exercises })
      .catch(console.log);

    updateWorkout();
    navigation.goBack();
  }, [date, title, bodyweight, exercises, navigation, updateWorkout]);

  const deleteWorkout = useCallback(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('workouts')
      .doc(date)
      .delete()
      .catch(console.log);

    cache[date] = cache.defaultWorkout();
    updateWorkout();
    navigation.goBack();
  }, [date, updateWorkout, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.header}>
          <Ionicons
            name={'save'}
            onPress={saveWorkout}
            style={styles.headerRight}
            size={30}
          />
          <Ionicons
            name={'trash'}
            onPress={deleteWorkout}
            style={styles.headerRight}
            size={30}
          />
        </View>
      ),
      title: date,
    });
  }, [date, navigation, saveWorkout, deleteWorkout]);

  const addExercise = () => {
    workout.exercises.push({
      name: 'untitled',
      sets: [{ goal: 5, reps: '', weight: 100 }],
    });
    setExercises(workout.exercises.slice());
  };

  const removeExercise = (idx) => {
    workout.exercises.splice(idx, 1);
    setExercises(workout.exercises.slice());
  };

  const updateExercise = (idx, newInfo) => {
    workout.exercises[idx] = { ...exercises[idx], ...newInfo };
    setExercises(workout.exercises.slice());
  };

  const updateTitle = (value) => {
    workout.title = value;
    setTitle(value);
  };

  const updateBW = (value) => {
    workout.bodyweight = value;
    setBodyweight(value);
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
        <TextInput value={title} onChangeText={updateTitle} />
        <View style={[styles.header, styles.bodyweight]}>
          <Text>BW:</Text>
          <TextInput
            style={styles.bwInput}
            value={String(bodyweight)}
            keyboardType="number-pad"
            onChangeText={updateBW}
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
  headerRight: {
    color: 'blue',
    paddingRight: 20,
  },
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
