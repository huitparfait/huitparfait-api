'use strict';

const config = require('./config/config');

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: { auth: false },
    handler: function () {
      return 'OK';
    },
  },
];
