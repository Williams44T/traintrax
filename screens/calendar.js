import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Day } from '../components';

export default function Calendar({ navigation, test }) {
  var [date, setDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - new Date().getDay(),
    ),
  );

  const updateTitle = useCallback(() => {
    navigation.setOptions({ title: 'Week of ' + date.toDateString().slice(4) });
  }, [navigation, date]);

  useEffect(() => {
    updateTitle();
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

  const DayRow = ({ row }) => {
    return (
      <View style={styles.row}>
        {row.map((day, i) => (
          <Day
            key={i}
            navigation={navigation}
            date={day.toDateString().slice(0, 15)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#073603', 'transparent']}
        style={styles.background}
      />
      <View style={styles.btnBox}>
        <Button title="<" onPress={() => changeWeek('prev')} />
        <Button title="Today" onPress={changeWeek} />
        <Button title=">" onPress={() => changeWeek('next')} />
      </View>
      <View style={styles.container}>
        <DayRow row={[new Date(date), addDay()]} />
        <DayRow row={[addDay(), addDay(), addDay()]} />
        <DayRow row={[addDay(), addDay()]} />
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 500,
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
});
