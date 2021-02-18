import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function DayRow({ navigation, row }) {
  return (
    <View style={styles.row}>
      {row.map((day, i) => (
        <TouchableOpacity
          key={i}
          style={styles.day}
          onPress={() => navigation.navigate('Workout')}
        >
          <Text style={styles.dateText}>{day.toDateString().slice(4, 10)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  day: {
    alignItems: 'flex-end',
    width: 100,
    height: 130,
    margin: 10,
    borderRadius: 5,
    padding: 10,
    elevation: 4,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 10,
  },
});
