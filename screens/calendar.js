import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function Calendar({ navigation }) {
  var [date, setDate] = useState(new Date());

  const updateTitle = () => {
    navigation.setOptions({ title: 'Week of ' + date.toDateString().slice(4) });
  };

  useEffect(() => {
    var weekDay = date.getDay();
    date.setDate(date.getDate() - weekDay);
    updateTitle();
    setDate(new Date(date));
  }, []);

  const DateRow = (props) => {
    return (
      <View style={styles.row}>
        {props.row.map((day, i) => (
          <TouchableOpacity
            key={i}
            style={styles.date}
            onPress={() => navigation.navigate('Workout')}
          >
            <Text style={styles.dateText}>
              {day.toDateString().slice(4, 10)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const addDay = () => {
    date.setDate(date.getDate() + 1);
    return new Date(date);
  };

  const changeWeek = (direction) => {
    direction === 'next' ? addDay() : date.setDate(date.getDate() - 13);
    updateTitle();
    setDate(new Date(date));
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnBox}>
        <Button title="Last Week" onPress={() => changeWeek('last')} />
        <Button title="Next Week" onPress={() => changeWeek('next')} />
      </View>
      <View style={styles.container}>
        <DateRow row={[new Date(date), addDay()]} />
        <DateRow row={[addDay(), addDay(), addDay()]} />
        <DateRow row={[addDay(), addDay()]} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  date: {
    alignItems: 'flex-end',
    width: 100,
    height: 130,
    margin: 10,
    borderRadius: 5,
    padding: 10,
    elevation: 4,
  },
  dateText: {
    fontSize: 10,
  },
});
