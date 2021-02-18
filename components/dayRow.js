import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function DayRow({ navigation, row }) {
  return (
    <View style={styles.row}>
      {row.map((day, i) => {
        const today = new Date().toDateString();
        const dayText = day.toDateString();
        const style =
          today === dayText ? [styles.day, styles.today] : styles.day;
        return (
          <TouchableOpacity
            key={i}
            style={style}
            onPress={() => navigation.navigate('Workout')}
          >
            <Text style={styles.dateText}>{dayText.slice(0, 10)}</Text>
          </TouchableOpacity>
        );
      })}
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
