'use strict';

const _ = require('lodash');
const { Pool } = require('pg');
const config = require('./config/config');

const DATABASE_NAME = config.get('DATABASE_NAME');
const DATABASE_USER = config.get('DATABASE_USER');
const DATABASE_PASSWORD = config.get('DATABASE_PASSWORD');
const DATABASE_HOST = config.get('DATABASE_HOST');
const DATABASE_PORT = config.get('DATABASE_PORT');

const pool = new Pool({
  database: DATABASE_NAME,
  user: DATABASE_USER,
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
});

function camelCase(user) {
  return _.mapKeys(user, (v, k) => _.camelCase(k));
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
      throw new Error('Database error: NoResults');
    }
    if (rawResults.rowCount > 1) {
      throw new Error('Database error: TooManyResults');
    }
    return camelCase(rawResults.rows[0]);
  },

};
