import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { DayRow } from '../components';

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
        <DayRow row={[new Date(date), addDay()]} navigation={navigation} />
        <DayRow row={[addDay(), addDay(), addDay()]} navigation={navigation} />
        <DayRow row={[addDay(), addDay()]} navigation={navigation} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
