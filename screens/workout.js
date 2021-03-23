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
import { LinearGradient } from 'expo-linear-gradient';
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

    cache[date] = { title, bodyweight, exercises };
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
      {/* <LinearGradient
        colors={['#073603', 'transparent', '#073603']}
        style={styles.background}
      /> */}
      <View style={styles.subHeader}>
        <TextInput
          style={styles.subHeaderTxt}
          value={title}
          onChangeText={updateTitle}
        />
        <View style={[styles.subHeader, styles.bodyweight]}>
          <Text style={styles.subHeaderTxt}>BW:</Text>
          <TextInput
            style={styles.subHeaderTxt}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 2,
    paddingHorizontal: 15,
  },
  subHeaderTxt: {
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 18,
    textShadowRadius: 5,
  },
  bodyweight: {
    width: '25%',
    paddingHorizontal: 0,
  },
  exercises: {
    width: '100%',
  },
});
