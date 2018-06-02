'use strict';

const convict = require('convict');

const conf = convict({
  NODE_ENV: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  PORT: {
    doc: 'The port on which the server is running',
    format: Number,
    default: 3001,
    env: 'PORT',
  },
  DATABASE_HOST: {
    doc: 'The database host',
    format: String,
    default: "localhost",
    env: 'DATABASE_HOST',
  },
  DATABASE_PORT: {
    doc: 'The database port',
    format: Number,
    default: 5432,
    env: 'DATABASE_PORT',
  },
  DATABASE_USER: {
    doc: 'The database user',
    format: String,
    default: "",
    env: 'DATABASE_USER',
  },
  DATABASE_PASSWORD: {
    doc: 'The database password',
    format: String,
    default: "",
    env: 'DATABASE_PASSWORD',
  },
  DATABASE_NAME: {
    doc: 'The database name',
    format: String,
    default: "",
    env: 'DATABASE_NAME',
  },
});

if (conf.get('NODE_ENV') === 'development') {
  conf.loadFile('./src/config/development.config.json');
}

module.exports = conf;
