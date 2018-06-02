'use strict';

const config = require('./config/config');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: function () {
      return 'OK';
    },
  },
  {
    method: 'GET',
    path: '/api/ping',
    handler: function () {
      return 'pong!';
    },
  },
];
