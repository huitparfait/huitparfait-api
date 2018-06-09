'use strict';

const _ = require('lodash');
const config = require('./config/config');
const pg = require('pg');

// Fix for parsing of numeric fields
pg.types.setTypeParser(20, 'text', parseFloat);

const pool = new pg.Pool({
  database: config.get('DATABASE_NAME'),
  user: config.get('DATABASE_USER'),
  host: config.get('DATABASE_HOST'),
  password: config.get('DATABASE_PASSWORD'),
  port: config.get('DATABASE_PORT'),
  max: config.get('DATABASE_POOL_MAX'),
});

function camelCase (user) {
  return _.mapKeys(user, (v, k) => _.camelCase(k));
}

class DatabaseNotFoundError extends Error {
  constructor (message) {
    super(`DatabaseNotFoundError: ${message}`);
  }
}

class DatabaseTooManyResultsError extends Error {
  constructor (message) {
    super(`DatabaseTooManyResultsError: ${message}`);
  }
}

module.exports = {

  async many (query) {
    const rawResults = await pool.query(query);
    return rawResults.rows
      .map(camelCase);
  },

  async one (query) {
    const rawResults = await pool.query(query);
    if (rawResults.rowCount === 0) {
      throw new DatabaseNotFoundError('No Results');
    }
    if (rawResults.rowCount > 1) {
      throw new DatabaseTooManyResultsError('Too many results');
    }
    return camelCase(rawResults.rows[0]);
  },

  DatabaseNotFoundError,
  DatabaseTooManyResultsError,

};
