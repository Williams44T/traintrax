const { Sequelize, DataTypes } = require('sequelize');
const { STRING, INTEGER } = DataTypes;

const sequelizeOptions = {
  logging: false,
  dialect: 'sqlite',
  storage: './workouts.sqlite',
};
const sequelize = new Sequelize(sequelizeOptions);

const workoutSchema = {
  date: STRING,
  title: STRING,
  bodyweight: INTEGER,
};

const exerciseSchema = {
  date: STRING,
  exerciseIdx: INTEGER,
  name: STRING,
};

const setSchema = {
  date: STRING,
  exerciseIdx: INTEGER,
  setIdx: INTEGER,
  goal: INTEGER,
  actual: INTEGER,
  weight: INTEGER,
};

const schemaOptions = {
  timestamps: false,
};

const Workout = sequelize.define('Workout', workoutSchema, schemaOptions);
const Exercise = sequelize.define('Exercise', exerciseSchema, schemaOptions);
const Set = sequelize.define('Set', setSchema, schemaOptions);

const syncOptions = {
  alter: true,
};

sequelize.authenticate()
.then(() => console.log('connected to ' + sequelizeOptions.storage))
.then(() => sequelize.sync(syncOptions))
.catch((err) => console.log('ERROR:', err.message));

module.exports = { Workout, Exercise, Set };


