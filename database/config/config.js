'use strict';

const config = require('../../src/config/config');

module.exports = {
  'host': config.get('DATABASE_HOST'),
  'port': config.get('DATABASE_PORT'),
  'username': config.get('DATABASE_USER'),
  'password': config.get('DATABASE_PASSWORD'),
  'database': config.get('DATABASE_NAME'),
  'dialect': 'postgres',
  'seederStorage': 'sequelize',
  'seederStorageTableName': 'SequelizeData',
};
