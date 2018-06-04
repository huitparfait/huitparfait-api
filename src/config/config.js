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
    required: true,
    default: null,
    env: 'DATABASE_HOST',
  },
  DATABASE_PORT: {
    doc: 'The database port',
    format: Number,
    required: true,
    default: null,
    env: 'DATABASE_PORT',
  },
  DATABASE_USER: {
    doc: 'The database user',
    format: String,
    required: true,
    default: null,
    env: 'DATABASE_USER',
  },
  DATABASE_PASSWORD: {
    doc: 'The database password',
    format: String,
    required: true,
    default: null,
    env: 'DATABASE_PASSWORD',
  },
  DATABASE_NAME: {
    doc: 'The database name',
    format: String,
    required: true,
    default: null,
    env: 'DATABASE_NAME',
  },
  JWT_PUBLIC_KEY: {
    doc: 'The RS512 public key to verify the JWT signature',
    format: String,
    required: true,
    default: null,
    env: 'JWT_PUBLIC_KEY',
  },
  JWT_TEST_PRIVATE_KEY: {
    doc: 'The RS512 private key to sign JWT tokens. Used for development and testing only',
    format: String,
    default: null,
    env: 'JWT_TEST_PRIVATE_KEY',
  },
});

if (conf.get('NODE_ENV') === 'development') {
  conf.loadFile('./src/config/config.dev.json');
}

module.exports = conf;
