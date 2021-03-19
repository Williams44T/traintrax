import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
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
    navigation.setOptions({
      title: 'Week Beginning ' + date.toDateString().slice(4),
    });
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

  const btnGradient = ['#073603', '#178038', '#073603'];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['transparent', '#073603', '#073603', 'transparent']}
        style={styles.background}
      />
      <View style={styles.btnBox}>
        <TouchableOpacity onPress={() => changeWeek('prev')}>
          <LinearGradient colors={btnGradient} style={styles.btn}>
            <Text style={styles.btnText}>&lt;</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={changeWeek}>
          <LinearGradient colors={btnGradient} style={styles.btn}>
            <Text style={styles.btnText}>TODAY</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeWeek('next')}>
          <LinearGradient colors={btnGradient} style={styles.btn}>
            <Text style={styles.btnText}>&gt;</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  btn: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
  },
});
