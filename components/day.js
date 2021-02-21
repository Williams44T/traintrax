import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
const { firestore, auth } = firebase;

export default function Day({ navigation, date }) {
  const [workout, setWorkout] = useState({
    title: 'untitled',
    bodyweight: 900,
    exercises: [],
  });
  const [workoutExists, setWorkoutExists] = useState(false);

  const getWorkout = useCallback(async () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('workouts')
      .doc(date)
      .get()
      .then((workoutDoc) => {
        if (workoutDoc.exists) {
          setWorkout(workoutDoc.data());
          setWorkoutExists(true);
        }
      })
      .catch(console.log);
  }, [date]);

  useEffect(() => {
    getWorkout();
  }, [getWorkout]);

  const style =
    date === new Date().toDateString().slice(0, 15)
      ? [styles.day, styles.today]
      : styles.day;

  const workoutDisplay = workoutExists ? (
    <Text style={styles.workoutText}>{workout.title}</Text>
  ) : (
    <View style={styles.noWorkout}>
      <Text>+</Text>
    </View>
  );

  return (
    <TouchableOpacity
      style={style}
      onPress={() => navigation.navigate('Workout', { date, workout })}
    >
      <Text style={styles.dateText}>{date.slice(0, 10)}</Text>
      <View style={styles.workout}>{workoutDisplay}</View>
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
    backgroundColor: 'grey',
  },
  workoutText: {
    textAlign: 'center',
  },
});
