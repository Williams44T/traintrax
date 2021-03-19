import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import cache from '../dbCache';
import { Loading } from '../components';
import firebase from 'firebase';
const { firestore, auth } = firebase;

export default function Day({ navigation, date }) {
  const [loading, setLoading] = useState(!cache[date]);
  const [workout, setWorkout] = useState(cache[date] || cache.defaultWorkout());
  const [workoutExists, setWorkoutExists] = useState(
    !!cache[date] &&
      (cache[date].title !== 'untitled' || !!cache[date].exercises.length),
  );

  const getWorkout = useCallback(async () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('workouts')
      .doc(date)
      .get()
      .then((workoutDoc) => {
        if (workoutDoc.exists) {
          cache[date] = workoutDoc.data();
          setWorkout(cache[date]);
          setWorkoutExists(true);
        } else {
          cache[date] = cache.defaultWorkout();
        }
        setLoading(false);
      })
      .catch(console.log);
  }, [date]);

  useEffect(() => {
    !cache[date] ? getWorkout() : null;
  }, [date, getWorkout]);

  const updateWorkout = async (updatedWorkout) => {
    await setWorkout(cache.defaultWorkout());
    setWorkout(cache[date]);
    setWorkoutExists(
      cache[date] &&
        (cache[date].title !== 'untitled' || cache[date].exercises.length),
    );
  };

  const style =
    date === new Date().toDateString().slice(0, 15)
      ? [styles.day, styles.today]
      : styles.day;

  const workoutDisplay = workoutExists ? (
    <Text style={styles.workoutText}>{workout.title}</Text>
  ) : (
    <Text style={[styles.workoutText, styles.addWorkout]}>+</Text>
  );

  const preview = loading ? (
    <Loading />
  ) : (
    <>
      <Text style={styles.dateText}>{date.slice(0, 10)}</Text>
      <View style={styles.workout}>{workoutDisplay}</View>
    </>
  );

  return (
    <TouchableOpacity
      style={style}
      onPress={() =>
        navigation.navigate('Workout', { date, workout, updateWorkout })
      }
    >
      {preview}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  day: {
    alignItems: 'center',
    width: 100,
    height: 130,
    margin: 10,
    borderRadius: 5,
    padding: 5,
    elevation: 4,
    backgroundColor: '#fff',
  },
  today: {
    backgroundColor: 'lightblue',
  },
  dateText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  workout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  noWorkout: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#ccc',
    elevation: 4,
  },
  workoutText: {
    color: '#073603',
    fontWeight: 'bold',
  },
  addWorkout: {
    fontSize: 60,
  },
});
