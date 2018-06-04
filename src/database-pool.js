'use strict';

const _ = require('lodash');
const pg = require('pg');
// Fix for parsing of numeric fields
pg.types.setTypeParser(20, 'text', parseFloat);

const config = require('./config/config');

const pool = new pg.Pool({
  database: config.get('DATABASE_NAME'),
  user: config.get('DATABASE_USER'),
  host: config.get('DATABASE_HOST'),
  password: config.get('DATABASE_PASSWORD'),
  port: config.get('DATABASE_PORT'),
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
