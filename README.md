# TrainTrax

[Summary](#summary)  
[Technologies](#technologies)  
[Limitations](#limitations)  
[Schemas](#schemas)  
- [Workout](#workout)
- [Exercise](#exercise)
- [Set](#set)

---
---
## Summary
This mobile app aims to allow users to track their workouts and view stats per exercise. Users will be able to navigate to a calendar screen, choose a date, and either add a workout or edit an existing one. They'll also be able to navigate to the stats screen, choose an exercise, and view it's stats based on a user provided date range.

---
---
## Technologies
- Expo for a fast React Native build
- SQLite for local storage of workouts
- sequelize and sqlite3 for driving SQLite

---
---

## Limitations

- Only workout is allowed per day
- It is assumed that exercises involve lifting weight (bodyweight counts)

---
---
## Schemas

### Workout
```
{
  date: STRING,
  title: STRING,
  bodyweight: INTEGER,
}
```
### Exercise
```
{
  date: STRING,
  exerciseIdx: INTEGER,
  name: STRING,
}
```
### Set
```
{
  date: STRING,
  exerciseIdx: INTEGER,
  setIdx: INTEGER,
  goal: INTEGER,
  actual: INTEGER,
  weight: INTEGER,
}
```
---
---