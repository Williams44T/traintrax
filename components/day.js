import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
const { firestore, auth } = firebase;

export default function Day({ navigation, date }) {
  const [workout, setWorkout] = useState({
    title: 'untitled',
    bodyweight: 900,
    exercises: [],
  });

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

  return (
    <TouchableOpacity
      style={style}
      onPress={() => navigation.navigate('Workout', { date, workout })}
    >
      <Text style={styles.dateText}>{date.slice(0, 10)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  day: {
    alignItems: 'flex-end',
    width: 100,
    height: 130,
    margin: 10,
    borderRadius: 5,
    paddingRight: 5,
    elevation: 4,
    backgroundColor: '#fff',
  },
  today: {
    backgroundColor: 'lightblue',
  },
  dateText: {
    fontSize: 10,
  },
});
