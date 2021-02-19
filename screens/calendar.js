import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { DayRow } from '../components';

export default function Calendar({ navigation, test }) {
  var [date, setDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - new Date().getDay(),
    ),
  );

  const updateTitle = () => {
    navigation.setOptions({ title: 'Week of ' + date.toDateString().slice(4) });
  };

  useEffect(() => {
    updateTitle();
    console.log('useEffect');
  }, []);

  const addDay = () => {
    date.setDate(date.getDate() + 1);
    return new Date(date);
  };

  const changeWeek = (direction) => {
    if (direction === 'next') {
      addDay();
    } else if (direction === 'prev') {
      date.setDate(date.getDate() - 13);
    } else {
      date = new Date();
      date.setDate(date.getDate(date) - date.getDay());
    }

    updateTitle();
    setDate(new Date(date));
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnBox}>
        <Button title="<" onPress={() => changeWeek('prev')} />
        <Button title="Today" onPress={changeWeek} />
        <Button title=">" onPress={() => changeWeek('next')} />
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
